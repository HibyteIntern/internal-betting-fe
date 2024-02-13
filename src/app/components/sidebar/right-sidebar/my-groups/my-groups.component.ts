import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FullUserProfile } from '../../../../entity/full-user-profile';
import { UserProfileService } from '../../../../service/user-profile.service';
import {FullUserGroupModel} from "../../../../entity/full-user-group.model";

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss'],
})
export class MyGroupsComponent implements OnInit {
  userProfile$?: Observable<FullUserProfile | null>;
  myGroups: FullUserGroupModel[] = [];

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    console.log(this.userProfile$?.subscribe((data) => {
        // console.log(data);
        this.myGroups = data?.groups || [];
      })
    );
  }

  fetchUserProfile(): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getUserProfile();
  }
}
