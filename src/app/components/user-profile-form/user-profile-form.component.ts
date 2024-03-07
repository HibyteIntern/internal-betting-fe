import { Location } from '@angular/common';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { FullUserProfile } from 'src/app/entity/full-user-profile';
import { AvatarService } from 'src/app/service/avatar.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import {ImageService} from "../../service/image.service";

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent implements OnChanges, OnInit {
  @Input() userProfile?: FullUserProfile | null;

  userProfileForm: FormGroup;
  uploadedPhotoId?: number;
  originalUserProfile?: FullUserProfile;
  file: File | null = null;
  isLoading = false;
  updatedFile: File | null = null;
  blob: Blob | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private imageService: ImageService,
    private location: Location,
  ) {
    this.userProfileForm = this.formBuilder.group({
      username: ['', [Validators.required], [this.usernameTakenValidator()]],
      description: '',
    });
  }

  ngOnInit() {
    if (this.userProfile) {
      this.userProfileService.getPhoto().subscribe((blob) => {
        this.blob = blob;
      });
    }
  }

  ngOnChanges(): void {
    if (this.userProfile) {
      this.originalUserProfile = { ...this.userProfile };
      this.userProfileForm.patchValue(this.userProfile);
    }
  }

  private usernameTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const currentUsername = this.originalUserProfile?.username;
      if (!control.value || control.value === currentUsername) {
        return of(null);
      }
      return this.userProfileService
        .isUsernameTaken(control.value, currentUsername)
        .pipe(
          map((isTaken) => (isTaken ? { usernameTaken: true } : null)),
          catchError(() => of(null)),
        );
    };
  }

  async onSubmit() {
    if (this.updatedFile) {
      try {
        this.uploadedPhotoId = await this.userProfileService
          .addPhoto(this.updatedFile)
          .toPromise();
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

    this.isLoading = true;
    this.userProfileService
      .update(updatedUserProfile)
      .pipe(
        finalize(() => {
          this.isLoading = false;
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

  handleFileChange(file: File) {
    this.updatedFile = file;
  }
}
