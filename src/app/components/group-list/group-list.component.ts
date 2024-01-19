import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FullUserGroupModel} from "../../entity/full-user-group.model";
import {Router} from "@angular/router";
import {GroupService} from "../../service/group.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  @Input() groups!: FullUserGroupModel[] | null;
  constructor(private groupService: GroupService, private router: Router){}

  handleEdit(id: number) {
    this.router.navigate(['user-groups/edit', id]);
  }

  handleDelete(id: number) {
    this.groupService.delete(id).subscribe(() => {
      this.groupService.getAll().subscribe((data) => {
        this.groups = data;
      })
    })
  }

  createGroup() {
    this.router.navigate(['user-groups/create']);
  }
}
