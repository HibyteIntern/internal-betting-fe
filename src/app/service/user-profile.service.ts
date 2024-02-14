import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { FullUserProfile } from '../entity/full-user-profile';
import { KeycloakProfile } from 'keycloak-js';
import { AvatarService } from './avatar.service';
import { UserProfile } from '../entity/user-profile';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfileSubject: BehaviorSubject<FullUserProfile | null> =
    new BehaviorSubject<FullUserProfile | null>(null);
  public userProfile$: Observable<FullUserProfile | null> =
    this.userProfileSubject.asObservable();

  userProfile: FullUserProfile | null = null;
  userProfileUrl = `${environment.baseUrl}/v1/user-profile`;

  constructor(
    private http: HttpClient,
    private avatarService: AvatarService,
  ) {}

  async checkUserProfile(
    userProfileKeycloak: KeycloakProfile,
  ): Promise<FullUserProfile> {
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

  async updateUserProfile(
    userProfile: FullUserProfile,
  ): Promise<FullUserProfile> {
    const updatedProfile = await this.update(userProfile).toPromise();
    if (!updatedProfile) {
      throw new Error('Failed to update user profile.');
    }
    return updatedProfile;
  }

  async uploadAvatarAndUpdateProfile(avatarFile: File) {
    await firstValueFrom(this.addPhoto(avatarFile));
  }

  getAll(): Observable<FullUserProfile[]> {
    return this.http.get<FullUserProfile[]>(this.userProfileUrl);
  }

  getUserProfile() {
    this.http
      .get<FullUserProfile>(`${this.userProfileUrl}/getMe`)
      .subscribe((user) => {
        this.userProfileSubject.next(user);
      });
  }

  getMe(): Observable<FullUserProfile> {
    return this.http.get<FullUserProfile>(`${this.userProfileUrl}/getMe`);
  }

  getMeSimple(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userProfileUrl}/getMeSimple`);
  }

  create(userProfile: FullUserProfile): Observable<FullUserProfile> {
    return this.http.post<FullUserProfile>(this.userProfileUrl, userProfile);
  }

  update(userProfile: FullUserProfile): Observable<FullUserProfile> {
    return this.http.put<FullUserProfile>(
      `${this.userProfileUrl}`,
      userProfile,
    );
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

  displayProfileImage(blob: Blob, selector: string) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector(selector) as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.classList.add('profile-image');
    }
  }
}
