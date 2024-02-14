import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../service/group.service';
import { FullUserGroupModel } from '../../../entity/full-user-group.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups$: Observable<FullUserGroupModel[]> | undefined;
  constructor(public groupService: GroupService) {}

  ngOnInit(): void {
    this.groups$ = this.groupService.getAll();
  }
}
