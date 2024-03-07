import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FullUserGroupModel } from '../../../entity/full-user-group.model';
import {GroupService} from "../../../service/group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit{
  @Input() group?: FullUserGroupModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  blob: Blob | undefined;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    if (this.group?.userGroupId) {
      this.groupService.getPhoto(this.group?.userGroupId).subscribe((blob) => {
        this.blob = blob;
      });
    }
  }

}
