import {Component, Input} from '@angular/core';
import {UserGroupModel} from "../../models/user-group.model";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() group?: UserGroupModel;
}
