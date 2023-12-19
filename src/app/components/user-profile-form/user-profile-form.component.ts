import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

  originalUserProfile?: UserProfile;

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService
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
        }
  }

  onSubmit() {
    console.log(this.userProfileForm.value);

    const formValue = this.userProfileForm.value;
    const updatedUserProfile: UserProfile = {
      userId: this.userProfile?.userId,
      keycloakId: this.userProfile?.keycloakId,
      username: formValue.username !== null && formValue.username !== undefined ? formValue.username : '',
      profilePicture: this.userProfile?.profilePicture,
      description: formValue.description !== null && formValue.description !== undefined ? formValue.description : '',
      coins: this.userProfile?.coins,
      bets: this.userProfile?.bets,
    };

    if (this.originalUserProfile) {
      updatedUserProfile.username = updatedUserProfile.username || this.originalUserProfile.username || '';
      updatedUserProfile.description = updatedUserProfile.description || this.originalUserProfile.description || '';
    }

    console.log(updatedUserProfile);

    this.userProfileService.update(updatedUserProfile).subscribe((user) => {
      console.log(user);
    });
  }
}
