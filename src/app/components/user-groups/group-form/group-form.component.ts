import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserProfileService } from '../../../service/user-profile.service';
import { GroupService } from '../../../service/group.service';
import { Router } from '@angular/router';
import {UserGroupModel} from "../../../entity/user-group.model";
import {FullUserProfile} from "../../../entity/full-user-profile";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnChanges, OnInit {
  @Input() initialGroup: UserGroupModel | null | undefined;
  @Output() formSubmit = new EventEmitter<UserGroupModel>();

  userOptions: string[] = [];
  selectedUsers: string[] = [];
  allUserProfiles: FullUserProfile[] = [];
  selectedUserIds: (number | undefined)[] = [];
  userGroupForm: FormGroup;
  isEditMode = false;
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
      users: [
        this.initialGroup?.users || [],
        [Validators.required, this.validateSelectedUsers.bind(this)],
      ],
    });
    this.fetchUserProfiles()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialGroup']) {
      this.updateFormWithInitialGroup();
    }
  }

  private updateFormWithInitialGroup(): void {
    if (this.initialGroup) {
      this.userGroupForm.patchValue({
        groupName: this.initialGroup.groupName || '',
        description: this.initialGroup.description || '',
        users: this.initialGroup.users || [],
      });

      this.selectedUsers = this.initialGroup.users.map((userId) => {
        const user = this.allUserProfiles.find(profile => profile.userId === userId);
        return user?.username || '';
      });

      this.selectedUserIds = this.initialGroup.users;

      if (this.initialGroup.userGroupId && this.initialGroup.profilePicture) {
        this.groupService.getPhoto(this.initialGroup.userGroupId).subscribe(blob => {
          this.displayProfileImage(blob);
        });
      } else {
        console.error('User profile or profile picture is undefined.');
      }
    }
  }


  onSubmit() {
    const formValue = this.userGroupForm.value;
    const updatedGroup: UserGroupModel = {
      userGroupId: this.initialGroup ? this.initialGroup.userGroupId : null,
      groupName: formValue.groupName ?? '',
      description: formValue.description ?? '',
      users: formValue.users ?? [],
      profilePicture:
        this.uploadedPhotoId !== undefined
          ? this.uploadedPhotoId
          : this.initialGroup?.profilePicture,
    };
    this.formSubmit.emit(updatedGroup);
  }

  ngOnInit(): void {
    this.isEditMode = this.router.url.includes('edit');
    this.fetchUserProfiles()
  }

  fetchUserProfiles(): void {
    this.userService.getAll().subscribe((data) => {
      this.allUserProfiles = data;
      this.initializeUserOptions();
      if (this.initialGroup) {
        this.updateFormWithInitialGroup();
      }
    });
  }

  initializeUserOptions(): void {
    this.userOptions = this.allUserProfiles
      .filter(user => user.username && !this.selectedUsers.includes(user.username))
      .map(user => user.username);
  }

  handleUserSelect(users: string[]) {
    this.selectedUserIds = this.allUserProfiles
      .filter((user) => users.includes(user.username))
      .map((user) => user.userId);
    this.userGroupForm.patchValue({
      users: this.selectedUserIds,
    });
  }

  validateSelectedUsers(
    control: FormControl,
  ): { [key: string]: boolean } | null {
    const users = control.value;
    return users && users.length >= 2 ? null : { noUsersSelected: true };
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
        this.groupService
          .addPhoto(this.initialGroup.userGroupId, file)
          .subscribe((photoId) => {
            this.uploadedPhotoId = photoId;
          });
      } else {
        console.error('User ID is undefined');
      }
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
