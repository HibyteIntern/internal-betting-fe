import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, firstValueFrom } from 'rxjs';
import { UserProfile } from '../entity/UserProfile';
import { KeycloakProfile } from 'keycloak-js';
import { AvatarService } from './avatar.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileSubject: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);
  public userProfile$: Observable<UserProfile | null> = this.userProfileSubject
    .asObservable()
    .pipe(delay(100));

  userProfile: UserProfile | null = null;
  userProfileUrl = 'http://localhost:8080/api/v1/user-profile';

  constructor(
    private http: HttpClient,
    private avatarService: AvatarService,
  ) {}

  async checkUserProfile(
    userProfileKeycloak: KeycloakProfile,
  ): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      this.getMe().subscribe(async (existingProfile) => {
        let userProfile = existingProfile;
        try {
          if (userProfile.username == null && userProfileKeycloak.username) {
            userProfile.username = userProfileKeycloak.username;
            userProfile = await this.updateUserProfile(userProfile);
          }

          if (
            userProfile.profilePicture == null &&
            userProfileKeycloak.username &&
            userProfile.userId
          ) {
            const userId = String(userProfile.userId);
            const avatarSvg = this.avatarService.generateAvatar(userId);
            const avatarFile = await this.avatarService.convertSvgToImageFile(
              avatarSvg,
              userId,
            );

            if (userProfile.userId) {
              await this.uploadAvatarAndUpdateProfile(avatarFile);
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

  async updateUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    const updatedProfile = await this.update(userProfile).toPromise();
    if (!updatedProfile) {
      throw new Error('Failed to update user profile.');
    }
    return updatedProfile;
  }

  async uploadAvatarAndUpdateProfile(avatarFile: File) {
    await firstValueFrom(this.addPhoto(avatarFile));
  }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userProfileUrl);
  }

  getUserProfile() {
    this.http
      .get<UserProfile>(`${this.userProfileUrl}/getMe`)
      .subscribe((user) => {
        this.userProfileSubject.next(user);
      });
  }

  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userProfileUrl}/getMe`);
  }

  create(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.userProfileUrl, userProfile);
  }

  update(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.userProfileUrl}`, userProfile);
  }

  delete(): Observable<any> {
    return this.http.delete<any>(`${this.userProfileUrl}`);
  }

  addPhoto(photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);

    return this.http.post(`${this.userProfileUrl}/addPhoto`, formData, {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    });
  }

  getPhoto(): Observable<Blob> {
    return this.http.get(`${this.userProfileUrl}/getPhoto`, {
      responseType: 'blob',
    });
  }
}
