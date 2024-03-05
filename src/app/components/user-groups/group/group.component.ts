import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FullUserGroupModel } from '../../../entity/full-user-group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  @Input() group?: FullUserGroupModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
}
