import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import { AvatarService } from './avatar.service';
import { switchMap } from 'rxjs/operators';
import { FullUserGroupModel } from '../entity/full-user-group.model';
import { UserGroupModel } from '../entity/user-group.model';
import {FullUserProfile} from "../entity/full-user-profile";

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupUrl = '';
  constructor(
    private httpClient: HttpClient,
    private avatarService: AvatarService,
  ) {
    this.groupUrl = 'http://localhost:8080/api/v1/user-groups';
  }

  private blobSubject: BehaviorSubject<Blob | undefined> = new BehaviorSubject<Blob | undefined>(undefined);
  private blob$: Observable<Blob | undefined> = this.blobSubject.asObservable();

  getAll(): Observable<FullUserGroupModel[]> {
    return this.httpClient.get<FullUserGroupModel[]>(this.groupUrl);
  }

  getOne(id: number): Observable<UserGroupModel> {
    const url = `${this.groupUrl}/${id}`;
    return this.httpClient.get<UserGroupModel>(url);
  }

  create(group: UserGroupModel): Observable<UserGroupModel> {
    return this.httpClient.post<UserGroupModel>(this.groupUrl, group).pipe(
      switchMap(async (newGroup: UserGroupModel) => {
        if (newGroup.profilePicture == 0 && newGroup.userGroupId) {
          const avatarSvg = this.avatarService.generateAvatar(
            newGroup.groupName,
          );
          const avatarFile = await this.avatarService.convertSvgToImageFile(
            avatarSvg,
            newGroup.groupName,
          );
          await this.uploadAvatarAndUpdateGroup(
            newGroup.userGroupId,
            avatarFile,
            newGroup,
          );
        }
        return newGroup;
      }),
    );
  }

  update(group: UserGroupModel): Observable<UserGroupModel> {
    const url = `${this.groupUrl}/${group.userGroupId}`;
    return this.httpClient.put<UserGroupModel>(url, group);
  }

  delete(id: number): Observable<never> {
    const url = `${this.groupUrl}/${id}`;
    return this.httpClient.delete<never>(url);
  }

  addPhoto(groupId: number, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);

    return this.httpClient.post(
      `${this.groupUrl}/${groupId}/addPhoto`,
      formData,
      {
        headers: new HttpHeaders({
          enctype: 'multipart/form-data',
        }),
      },
    );
  }

  getPhoto(groupId: number): Observable<Blob> {
    return this.httpClient.get(`${this.groupUrl}/${groupId}/photo`, {
      responseType: 'blob',
    });
  }

  getPhoto2(groupId: number): void {
    this.httpClient.get(`${this.groupUrl}/${groupId}/photo`, {
      responseType: 'blob',
    }).subscribe((blob) => {
      this.blobSubject.next(blob);
    });
  }

  private async uploadAvatarAndUpdateGroup(
    userId: number,
    avatarFile: File,
    userGroup: UserGroupModel,
  ) {
    userGroup.profilePicture = await firstValueFrom(
      this.addPhoto(userId, avatarFile),
    );
    this.update(userGroup).subscribe();
  }
}
