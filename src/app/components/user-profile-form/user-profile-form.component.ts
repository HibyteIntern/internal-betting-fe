import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';


@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnChanges{
  @Input() userProfile?: UserProfile | null;

  userProfileForm: FormGroup;
  uploadedPhotoId?: number;

  originalUserProfile?: UserProfile;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private router: Router,
  ) {
    this.userProfileForm = this.formBuilder.group({
      username: '',
      description: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userProfile) {

          this.originalUserProfile = { ...this.userProfile };
          console.log(this.originalUserProfile);
          this.userProfileForm.patchValue(this.userProfile);

          if (this.userProfile && this.userProfile.userId && this.userProfile.profilePicture) {
            this.userProfileService.getPhoto(this.userProfile?.userId).subscribe(blob => {
              this.displayProfileImage(blob);
            });
          } else {
            console.error('User profile or profile picture is undefined.');
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

  onFileSelect(event: Event): void {
    const element = event.target as HTMLInputElement;
    let fileList: FileList | null = element.files;
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

      if (typeof this.userProfile?.userId === 'number') {
        this.userProfileService.addPhoto(this.userProfile.userId, file).subscribe((photoId) => {
          this.uploadedPhotoId = photoId;
          console.log(`Photo uploaded successfully with ID: ${photoId}`);
        });
      } else {
        console.error('User ID is undefined');
      }

      console.log(this.userProfile?.profilePicture);
    
    }
   
  }

  onSubmit() {
    console.log(this.userProfileForm.value);

    const formValue = this.userProfileForm.value;
    const updatedUserProfile: UserProfile = {
      userId: this.userProfile?.userId,
      keycloakId: this.userProfile?.keycloakId,
      username: formValue.username !== null && formValue.username !== undefined ? formValue.username : '',
      profilePicture: this.uploadedPhotoId !== undefined ? this.uploadedPhotoId : this.userProfile?.profilePicture,
      description: formValue.description !== null && formValue.description !== undefined ? formValue.description : '',
      coins: this.userProfile?.coins,
      bets: this.userProfile?.bets,
    };

    if (this.originalUserProfile) {
      updatedUserProfile.username = updatedUserProfile.username || this.originalUserProfile.username || '';
      updatedUserProfile.description = updatedUserProfile.description || this.originalUserProfile.description || '';
    }

    console.log(updatedUserProfile);

    this.userProfileService.update(updatedUserProfile).pipe(
      finalize(() => {
        this.router.navigate(['home/', this.userProfile?.userId]);
      })
    ).subscribe(
      (user) => {
        console.log(user);
      }
    );
  }

  onCancel(){
    this.router.navigate(['home/', this.userProfile?.userId]);
  }
}
