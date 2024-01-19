import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FullUserGroupModel} from "../entity/full-user-group.model";
import {UserGroupModel} from "../entity/user-group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl = '';
  constructor(private httpClient: HttpClient) {
    this.groupUrl = 'http://localhost:8080/api/v1/user-groups';
  }

  getAll(): Observable<FullUserGroupModel[]>{
    return this.httpClient.get<FullUserGroupModel[]>(this.groupUrl);
  }

  getOneFull(id: number): Observable<FullUserGroupModel>{
    const url = `${this.groupUrl}/${id}`;
    return this.httpClient.get<FullUserGroupModel>(url);
  }

  create(group: FullUserGroupModel): Observable<FullUserGroupModel>{
    return this.httpClient.post<FullUserGroupModel>(this.groupUrl, group);
  }

  update(group: FullUserGroupModel): Observable<FullUserGroupModel>{
    const url = `${this.groupUrl}/${group.userGroupId}`;
    return this.httpClient.put<FullUserGroupModel>(url, group);
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
