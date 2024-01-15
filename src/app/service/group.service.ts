import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserGroupModel} from "../entity/user-group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl = '';
  constructor(private httpClient: HttpClient) {
    this.groupUrl = 'http://localhost:8080/api/v1/user-groups';
  }

  getAll(): Observable<UserGroupModel[]>{
    return this.httpClient.get<UserGroupModel[]>(this.groupUrl);
  }

  getOne(id: number): Observable<UserGroupModel>{
    const url = `${this.groupUrl}/${id}`;
    return this.httpClient.get<UserGroupModel>(url);
  }

  create(group: UserGroupModel): Observable<UserGroupModel>{
    return this.httpClient.post<UserGroupModel>(this.groupUrl, group);
  }

  update(group: UserGroupModel): Observable<UserGroupModel>{
    const url = `${this.groupUrl}/${group.userGroupId}`;
    return this.httpClient.put<UserGroupModel>(url, group);
  }

  delete(id: number): Observable<any>{
    const url = `${this.groupUrl}/${id}`;
    return this.httpClient.delete<any>(url);
  }

  addPhoto(groupId: number, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);

    return this.httpClient.post(`${this.groupUrl}/${groupId}/addPhoto`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }

  getPhoto(groupId: number): Observable<Blob> {
    return this.httpClient.get(`${this.groupUrl}/${groupId}/photo`, { responseType: 'blob' });
  }
}
