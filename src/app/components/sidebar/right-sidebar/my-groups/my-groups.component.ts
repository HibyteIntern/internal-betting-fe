import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { UserProfile } from '../../../../entity/UserProfile';
import { UserProfileService } from '../../../../service/user-profile.service';
import { GroupService } from '../../../../service/group.service';
import { FullUserGroupModel } from '../../../../entity/full-user-group.model';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit, OnDestroy {
  userProfile$?: Observable<UserProfile | null>;
  groupsEntity: FullUserGroupModel[] = [];

  private destroy$ = new Subject<void>();

  constructor(private userProfileService: UserProfileService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.userProfile$ = this.userProfileService.userId$.pipe(
      takeUntil(this.destroy$),
      switchMap(userId => {
        if (userId) {
          return this.userProfileService.userProfile$;
        }
        return [];
      })
    );

    this.userProfile$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      console.log(user);
      if (user?.groups) {
        this.groupsEntity = user.groups as FullUserGroupModel[];
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
