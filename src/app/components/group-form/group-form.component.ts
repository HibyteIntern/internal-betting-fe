import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FullUserGroupModel} from "../../entity/full-user-group.model";
import {UserProfileService} from "../../service/user-profile.service";
import {UserProfile} from "../../entity/UserProfile";
import {GroupService} from "../../service/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnChanges, OnInit {
  @Input() initialGroup: FullUserGroupModel | null | undefined;
  @Output() formSubmit = new EventEmitter<FullUserGroupModel>();

  userOptions: string[] = [];
  selectedUsers: string[] = [];
  userProfiles: UserProfile[] = [];
  selectedUserProfiles: UserProfile[] = [];
  userGroupForm: FormGroup;
  isEditMode= false;
  uploadedPhotoId?: number;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserProfileService,
      private groupService: GroupService,
      private router: Router,
  ) {
    this.userGroupForm = this.formBuilder.group({
      groupName: [this.initialGroup?.groupName || '', Validators.required],
      description: this.initialGroup?.description || '',
      users: [this.initialGroup?.users || [], [Validators.required, this.validateSelectedUsers]]
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialGroup']) {
      if (this.initialGroup) {
        this.userGroupForm.patchValue({
        groupName: this.initialGroup.groupName || '',
        description: this.initialGroup.description || '',
        users: this.initialGroup.users || [],
      });
        console.log('Form values:', this.userGroupForm.value);

        if (this.initialGroup && this.initialGroup.userGroupId && this.initialGroup.profilePicture) {
          this.groupService.getPhoto(this.initialGroup?.userGroupId).subscribe(blob => {
            this.displayProfileImage(blob);
          });
        }
      else {
        console.error('User profile or profile picture is undefined.');
        }
      }
    }
  }

  onSubmit() {
    const formValue = this.userGroupForm.value;
    const updatedGroup: FullUserGroupModel = {
      userGroupId: this.initialGroup ? this.initialGroup.userGroupId : null,
      groupName: formValue.groupName ?? '',
      description: formValue.description ?? '',
      users: formValue.users?? [],
      profilePicture: this.uploadedPhotoId !== undefined ? this.uploadedPhotoId : this.initialGroup?.profilePicture,
    }
    this.formSubmit.emit(updatedGroup);
  }

  ngOnInit(): void {
    this.isEditMode = this.router.url.includes('edit');
    this.userService.getAll().subscribe((data) => {
      data.forEach((user) => {
        if(user.username && !this.selectedUsers.includes(user.username)) {
          this.userOptions.push(user.username);
          this.userProfiles.push(user);
        }
      });
    });
  }
  handleUserSelect(users: string[]) {
    const userProfiles: UserProfile[] = users.map(username => {
      return this.userProfiles.find(user => user.username === username) || { username };
    });

      this.userGroupForm.patchValue({
        users: userProfiles
      });
  }

  validateSelectedUsers(control: FormControl) {
    const selectedUsers = control.value;
    return selectedUsers && selectedUsers.length > 1 ? null : { noUsersSelected: true };
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

  displayProfileImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector('.profile-circle') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }
}
