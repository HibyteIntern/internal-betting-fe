import {Component} from '@angular/core';
import {GroupService} from "../../service/group.service";
import {Router} from "@angular/router";
import {UserGroupModel} from "../../entity/user-group.model";

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent {
  constructor(private groupService: GroupService, private router:Router) { }

  handleSubmit(group: UserGroupModel) {
    this.groupService.create(group).subscribe(() => {
      this.router.navigate(['/user-groups']);
    });
  }
}
