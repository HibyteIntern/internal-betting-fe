import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserGroupModel} from "../../models/user-group.model";
import {GroupService} from "../../service/group.service";
import {UserProfile} from "../../models/user.profile";
import {UserProfileService} from "../../service/user-profile.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnChanges, OnInit {
  @Input() initialGroup: UserGroupModel | null | undefined;
  @Output() formSubmit = new EventEmitter<UserGroupModel>();

  userOptions: string[] = ["user1", "user2", "user3"];
  userGroupForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserProfileService
  ) {
    this.userGroupForm = this.formBuilder.group({
      groupName: '',
      description: '',
      selectedUsers: [],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialGroup']) {
      if (this.initialGroup) {
        const {groupName, description, users} = this.initialGroup;
        this.userGroupForm.patchValue({groupName, description, selectedUsers: users});
      }
    }
  }

  onSubmit() {
    const formValue = this.userGroupForm.value;
    console.log(formValue);
    const updatedGroup: UserGroupModel = {
      userGroupId: this.initialGroup ? this.initialGroup.userGroupId : null,
      groupName: formValue.groupName!,
      description: formValue.description!,
      users: formValue.selectedUsers!,
    }
    console.log(updatedGroup);
    this.formSubmit.emit(updatedGroup);
  }

  ngOnInit(): void {
    console.log("da");
    // this.userService.getAll().subscribe((data) => {
    //   console.log(data);
    //   data.forEach((user) => {
    //     if(user.username) {
    //       this.userOptions.push(user.username);
    //     }
    //   });
    // });
  }
  handleUserSelect(users: string[]) {
    this.userGroupForm.patchValue({
      selectedUsers: users
    });
  }


}
