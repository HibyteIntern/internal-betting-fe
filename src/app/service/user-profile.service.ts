import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';
import { UserProfile } from '../entity/UserProfile';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  userProfile: UserProfile | null = null;
  userProifileUrl = 'http://localhost:8080/api/user-profile';

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
      //console.log(this.userProfileSubject.value);
      this.userProfile = userProfile;

    });
  }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.userProifileUrl);
  }

  getById(userId: number) {
    this.http.get<UserProfile>(`${this.userProifileUrl}/${userId}`).subscribe(user => {
      this.userProfileSubject.next(user);
    });
  }

  getByKeycloakId(keycloakId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userProifileUrl}/byKeycloakId/${keycloakId}`);
  }

  create(userProfile: UserProfile): Observable<UserProfile>{
    return this.http.post<UserProfile>(this.userProifileUrl, userProfile);
  }

  update(userProfile: UserProfile): Observable<UserProfile>{
    return this.http.put<UserProfile>(`${this.userProifileUrl}/${userProfile.userId}`, userProfile);
  }

  delete(userId: number):  Observable<any> {
    return this.http.delete<any>(`${this.userProifileUrl}/${userId}`);
  }



} 


