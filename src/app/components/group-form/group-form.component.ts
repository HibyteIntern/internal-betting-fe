import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserGroupModel} from "../../entity/user-group.model";
import {UserProfileService} from "../../service/user-profile.service";
import {UserProfile} from "../../entity/user.profile";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnChanges, OnInit {
  @Input() initialGroup: UserGroupModel | null | undefined;
  @Output() formSubmit = new EventEmitter<UserGroupModel>();

  userOptions: string[] = [];
  userProfiles: UserProfile[] = [];
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
    const updatedGroup: UserGroupModel = {
      userGroupId: this.initialGroup ? this.initialGroup.userGroupId : null,
      groupName: formValue.groupName!,
      description: formValue.description!,
      users: formValue.selectedUsers!,
    }
    this.formSubmit.emit(updatedGroup);
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      data.forEach((user) => {
        if(user.username) {
          this.userOptions.push(user.username);
          this.userProfiles.push(user);
        }
      });
    });
  }
  handleUserSelect(users: string[]) {
    const selectedUsers: UserProfile[] = users.map(username => {
      return this.userProfiles.find(user => user.username === username) || { username };
    });

    this.userGroupForm.patchValue({
      selectedUsers: selectedUsers
    });
  }
}
