import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';
import { UserProfile } from '../entity/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  userProifileUrl = 'http://localhost:8080/api/user-profiles';

  getAll(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(this.userProifileUrl);
  }

  getOne(userId: number) : Observable<UserProfile>{
    return this.http.get<UserProfile>(`${this.userProifileUrl}/${userId}`);
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


