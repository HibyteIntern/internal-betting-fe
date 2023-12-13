import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../service/group.service";
import {UserGroupModel} from "../../models/user-group.model";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: UserGroupModel[] = [];
  constructor(public  groupService: GroupService) { }

  ngOnInit(): void {
    this.groupService.getAll().subscribe((data) => {
      this.groups = data;
    })
  }

}
