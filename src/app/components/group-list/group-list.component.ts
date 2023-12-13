import {Component, Input} from '@angular/core';
import {UserGroupModel} from "../../models/user-group.model";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  @Input() groups!: UserGroupModel[] | null;
}
