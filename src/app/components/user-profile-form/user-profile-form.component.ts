import { Location } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FullUserProfile } from 'src/app/entity/full-user-profile';
import { AvatarService } from 'src/app/service/avatar.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnChanges {
  @Input() userProfile?: FullUserProfile | null;

  userProfileForm: FormGroup;
  uploadedPhotoId?: number;
  originalUserProfile?: FullUserProfile;
  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private avatarService: AvatarService,
    private location: Location,
  ) {
    this.userProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      description: '',
    });
  }

  ngOnChanges(): void {
    if (this.userProfile) {
      this.originalUserProfile = { ...this.userProfile };

      this.userProfileForm.patchValue(this.userProfile);

      if (
        this.userProfile &&
        this.userProfile.userId &&
        this.userProfile.profilePicture
      ) {
        this.userProfileService.getPhoto().subscribe((blob) => {
          this.userProfileService.displayProfileImageForSelector(blob, '.profile-circle');
        });
      } else {
        console.error('User profile or profile picture is undefined.');
      }
    }
  }

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const circle = document.querySelector('.profile-circle') as HTMLElement;
        if (circle && e.target && e.target.result) {
          circle.style.backgroundImage = `url(${e.target.result})`;
        }
      };

      reader.readAsDataURL(this.file);
    }
  }

  async onSubmit() {
    if (this.file) {
      try {
        const photoId = await this.userProfileService
          .addPhoto(this.file)
          .toPromise();
        this.uploadedPhotoId = photoId;
      } catch (error) {
        console.error('Error uploading photo:', error);
        return;
      }
    }

    const formValue = this.userProfileForm.value;
    const updatedUserProfile: FullUserProfile = {
      userId: this.userProfile?.userId,
      keycloakId: this.userProfile?.keycloakId,
      username:
        formValue.username !== null && formValue.username !== undefined
          ? formValue.username
          : '',
      profilePicture:
        this.uploadedPhotoId !== undefined && this.uploadedPhotoId !== null
          ? this.uploadedPhotoId
          : this.userProfile?.profilePicture,
      description:
        formValue.description !== null && formValue.description !== undefined
          ? formValue.description
          : '',
      coins: this.userProfile?.coins,
      bets: this.userProfile?.bets,
    };

    if (this.originalUserProfile) {
      updatedUserProfile.username =
        updatedUserProfile.username || this.originalUserProfile.username || '';
      updatedUserProfile.description =
        updatedUserProfile.description ||
        this.originalUserProfile.description ||
        '';
    }

    this.userProfileService
      .update(updatedUserProfile)
      .pipe(
        finalize(() => {
          location.reload();
          this.location.back();
        }),
      )
      .subscribe((user) => {
        console.log(user);
      });
  }

  onCancel() {
    this.location.back();
  }

  async onAddAvatar() {
    const userId = String(this.userProfile?.userId);
    const avatarSvg = this.avatarService.generateAvatar(userId);
    const avatarFile = await this.avatarService.convertSvgToImageFile(
      avatarSvg,
      userId,
    );
    if (this.userProfile?.userId) {
      await this.userProfileService.uploadAvatarAndUpdateProfile(avatarFile);
    }

    location.reload();
  }
}
