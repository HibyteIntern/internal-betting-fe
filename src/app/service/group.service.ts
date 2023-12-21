import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserGroupModel} from "../models/user-group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupUrl = '';
  constructor(private httpClient: HttpClient) {
    this.groupUrl = 'http://localhost:8080/api/user-groups';
  }

  getAll(): Observable<UserGroupModel[]>{
    return this.httpClient.get<UserGroupModel[]>(this.groupUrl);
  }

  getOne(id: number): Observable<UserGroupModel>{
    const url = `${this.groupUrl}/${id}`;
    return this.httpClient.get<UserGroupModel>(url);
  }

  create(group: UserGroupModel): Observable<UserGroupModel>{
    console.log(group);
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
}
