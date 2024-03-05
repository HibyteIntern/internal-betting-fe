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
import { UserGroupModel } from '../../../entity/user-group.model';
import { FullUserProfile } from '../../../entity/full-user-profile';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnChanges, OnInit {
  @Input() initialGroup: UserGroupModel | null | undefined;
  @Output() formSubmit = new EventEmitter<UserGroupModel>();
  file: File | null = null;
  initialId?: number | null;

  userOptions: string[] = [];
  selectedUsers: string[] = [];
  allUserProfiles: FullUserProfile[]= [];
  selectedUserIds: (number | undefined)[] = [];
  userGroupForm: FormGroup;
  isEditMode = false;
  uploadedPhotoId?: number;
  updatedFile: File | null = null;

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
    this.fetchUserProfiles();
  }

  ngOnInit(): void {
    this.isEditMode = this.router.url.includes('edit');
    this.fetchUserProfiles();
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
        const user = this.allUserProfiles.find(
          (profile) => profile.userId === userId,
        );
        return user?.username || '';
      });

      this.selectedUserIds = this.initialGroup.users;
      this.initialId = this.initialGroup.userGroupId;
    }
  }

  onSubmit() {
    const formValue = this.userGroupForm.value;
    try {
      if (typeof this.initialGroup?.userGroupId === 'number' && this.updatedFile) {
        this.groupService
          .addPhoto(this.initialGroup.userGroupId, this.updatedFile)
          .subscribe((photoId) => {
            this.uploadedPhotoId = photoId;
          });
      }
    }catch {
      console.error('User Group ID is undefined');
    }
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

  initializeUserOptions(): void {
    this.userOptions = this.allUserProfiles
      .filter(
        (user) => user.username && !this.selectedUsers.includes(user.username),
      )
      .map((user) => user.username);
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

  handleFileChange(file: File) {
    this.updatedFile = file;
  }
}
