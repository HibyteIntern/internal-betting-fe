import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';
import { UserProfile } from '../entity/UserProfile';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userProfile: UserProfile | null = null;
  userProfileUrl = 'http://localhost:8080/api/user-profile';

  constructor(private http: HttpClient) { }

  private userProfileSubject: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$: Observable<UserProfile | null> = this.userProfileSubject.asObservable().pipe(delay(100));

  
  checkUserProfile(userKeycloakId: string, userProfileKeycloak: KeycloakProfile){
    this.getByKeycloakId(userKeycloakId).subscribe((existingProfile) => {
        
      let userProfile = existingProfile;
  
      if(userProfile.username == null){
          userProfile.username = userProfileKeycloak?.username;
  
        this.update(userProfile).subscribe((updatedProfile) => {
          if (updatedProfile) {
            userProfile = updatedProfile;
      
          } else {
            console.log('Failed to update user profile.');
          }
        });
      }
      
      this.userProfileSubject.next(userProfile)
      this.userProfile = userProfile;

    });
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

  


} 


