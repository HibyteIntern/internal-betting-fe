import {Component, EventEmitter, Output} from '@angular/core';
import {GroupService} from "../../service/group.service";
import {Router} from "@angular/router";
import {UserGroupModel} from "../../models/user-group.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent {
  constructor(private groupService: GroupService, private router:Router) { }

  handleSubmit(group: UserGroupModel) {
    this.groupService.create(group).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/user-groups']);
    });
  }
}
