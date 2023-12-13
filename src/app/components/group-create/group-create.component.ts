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

  @Output() formSubmit = new EventEmitter<UserGroupModel>();

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private router:Router) {}

  protected groupForm = this.formBuilder.group({
    groupName: '',
    description: ''
    //users
  })

  handleSubmit() {
    const formValue = this.groupForm.value;
    const newGroup: UserGroupModel = {
      groupName: formValue.groupName!,
      description: formValue.description!
    }
    this.groupService.create(newGroup).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/user-groups']);
    }, (error) => {
      console.error('Error creating group:', error);
    })
  }
}
