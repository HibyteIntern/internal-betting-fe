import { Location } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { AvatarService } from 'src/app/service/avatar.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnChanges {
  @Input() userProfile?: UserProfile | null;

  userProfileForm: FormGroup;
  uploadedPhotoId?: number;
  originalUserProfile?: UserProfile;
  file: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private avatarService: AvatarService,
    private location: Location,
  ) {
    this.userProfileForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required],
        [this.usernameTakenValidator()]
      ],
      description: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userProfile) {
      this.originalUserProfile = { ...this.userProfile };
      this.userProfileForm.patchValue(this.userProfile);

      if (
        this.userProfile &&
        this.userProfile.userId &&
        this.userProfile.profilePicture
      ) {
        this.userProfileService.getPhoto().subscribe((blob) => {
          this.displayProfileImage(blob);
        });
      } else {
        console.error('User profile or profile picture is undefined.');
      }
    }
  }

  private usernameTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.userProfileService.isUsernameTaken(control.value).pipe(
        map(isTaken => (isTaken ? { usernameTaken: true } : null)),
        catchError(() => of(null))
      );
    };
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
    const updatedUserProfile: UserProfile = {
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
