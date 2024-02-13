import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../../service/user-profile.service';
import {GroupService} from "../../../../service/group.service";
import {UserGroupModel} from "../../../../entity/user-group.model";

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss'],
})
export class MyGroupsComponent implements OnInit {
  myGroups: UserGroupModel[] | undefined = [];

  constructor(private userProfileService: UserProfileService,
              private groupService: GroupService) {}

  ngOnInit() {
    this.userProfileService.getMeSimple().subscribe((userProfile) => {
        userProfile.groups?.forEach( (groupId) => {
          this.groupService.getOne(groupId).subscribe((group) => {
            this.myGroups?.push(group);
          });
        })
    });
  }

}
