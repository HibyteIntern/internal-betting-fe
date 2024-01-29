import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../service/group.service';
import { FullUserGroupModel } from '../../../entity/full-user-group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: FullUserGroupModel[] = [];
  constructor(public groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getAll().subscribe((data) => {
      this.groups = data;
    });
  }
}
