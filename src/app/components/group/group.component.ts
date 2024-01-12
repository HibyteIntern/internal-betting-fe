import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserGroupModel} from "../../entity/user-group.model";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() group?: UserGroupModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>()
}
