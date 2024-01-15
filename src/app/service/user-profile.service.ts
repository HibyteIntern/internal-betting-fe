import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, firstValueFrom, map } from 'rxjs';
import { UserProfile } from '../entity/UserProfile';
import { KeycloakProfile } from 'keycloak-js';
import { AvatarService } from './avatar.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userProfileSubject: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$: Observable<UserProfile | null> = this.userProfileSubject.asObservable().pipe(delay(100));

  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();
  userId?: number;

  userProfile: UserProfile | null = null;
  userProfileUrl = 'http://localhost:8080/api/user-profile';

  constructor(private http: HttpClient,
              private avatarService: AvatarService,
              private authService: AuthService) {
                (async () => {
                  const token = await this.authService.getToken();
                  if (token) {
                    const userKeycloakId = this.authService.decodeToken(token).sub;
                    try {
                      const user = await this.getByKeycloakId(userKeycloakId).toPromise();
                      if (user) {
                        this.userId = user.userId;
                        if(this.userId){
                          this.userIdSubject.next(this.userId);
                          console.log(this.userIdSubject);
                        }
                      } else {
                        this.userIdSubject.next(null);
                      }
                    } catch (error) {
                      console.error('Error fetching user:', error);
                      this.userIdSubject.next(null);
                    }
                  }
                })();
              }

  checkUserProfile(userKeycloakId: string, userProfileKeycloak: KeycloakProfile): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      this.getByKeycloakId(userKeycloakId).subscribe(async (existingProfile) => {
        let userProfile = existingProfile;
        try {
          if (userProfile.username == null && userProfileKeycloak.username) {
            userProfile.username = userProfileKeycloak.username;
            userProfile = await this.updateUserProfile(userProfile);
          }

          if (userProfile.profilePicture == null && userProfileKeycloak.username) {
            const avatarSvg = this.avatarService.generateAvatar(userProfileKeycloak.id);
            const avatarFile = await this.avatarService.convertSvgToImageFile(avatarSvg, userProfileKeycloak.id);
            if (userProfile.userId) {
              await this.uploadAvatarAndUpdateProfile(userProfile.userId, avatarFile, userProfile);
            }
          }
          resolve(userProfile);
        } catch (error) {
          console.error('Error in profile update:', error);
          reject(error);
        }
      });
    });
  }

  private async updateUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    const updatedProfile = await this.update(userProfile).toPromise();
    if (!updatedProfile) {
      throw new Error('Failed to update user profile.');
    }
    return updatedProfile;
  }

  private async uploadAvatarAndUpdateProfile(userId: number, avatarFile: File, userProfile: UserProfile) {
    const photoId = await firstValueFrom(this.addPhoto(userId, avatarFile));
    userProfile.profilePicture = photoId;
    this.userProfileSubject.next(userProfile);
  }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userProfileUrl);
  }

  getById(userId: number) {
    this.http.get<UserProfile>(`${this.userProfileUrl}/${userId}`).subscribe(user => {
      this.userProfileSubject.next(user);
    });
  }

  getByKeycloakId(keycloakId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userProfileUrl}/byKeycloakId/${keycloakId}`);
  }

  create(userProfile: UserProfile): Observable<UserProfile>{
    return this.http.post<UserProfile>(this.userProfileUrl, userProfile);
  }

  update(userProfile: UserProfile): Observable<UserProfile>{
    return this.http.put<UserProfile>(`${this.userProfileUrl}/${userProfile.userId}`, userProfile);
  }

  delete(userId: number):  Observable<any> {
    return this.http.delete<any>(`${this.userProfileUrl}/${userId}`);
  }

  addPhoto(userId: number, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);

    return this.http.post(`${this.userProfileUrl}/${userId}/addPhoto`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  getPhoto(userId: number): Observable<Blob> {
    return this.http.get(`${this.userProfileUrl}/${userId}/photo`, { responseType: 'blob' });
  }

  updateUserProfileAfterPhotoChange(userId: number): void {
    this.http.get<UserProfile>(`${this.userProfileUrl}/${userId}`).subscribe(userProfile => {
      this.userProfileSubject.next(userProfile);
    });
  }

}


