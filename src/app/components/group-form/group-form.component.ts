import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserGroupModel} from "../../entity/user-group.model";
import {UserProfileService} from "../../service/user-profile.service";
import {UserProfile} from "../../entity/UserProfile";
import {firstValueFrom} from "rxjs";
import {GroupService} from "../../service/group.service";

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
  submitted = false;
  isEditMode= false;
  uploadedPhotoId?: number;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserProfileService,
      private groupService: GroupService,
  ) {
    this.userGroupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      description: '',
      selectedUsers: [[], [Validators.required, this.validateSelectedUsers]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialGroup']) {
      this.isEditMode = !!this.initialGroup;
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
    this.submitted = true;
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

  validateSelectedUsers(control: FormControl) {
    const selectedUsers = control.value;
    return selectedUsers && selectedUsers.length > 0 ? null : { noUsersSelected: true };
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const circle = document.querySelector('.profile-circle') as HTMLElement;
        if (circle && e.target && e.target.result) {
          circle.style.backgroundImage = `url(${e.target.result})`;
        }
      };

      reader.readAsDataURL(file);

      if (typeof this.initialGroup?.userGroupId === 'number') {
        this.groupService.addPhoto(this.initialGroup.userGroupId, file).subscribe((photoId) => {
          this.uploadedPhotoId = photoId;
          console.log(`Photo uploaded successfully with ID: ${photoId}`);
        });
      } else {
        console.error('User ID is undefined');
      }

      console.log(this.initialGroup?.profilePicture);
    }
  }
}
