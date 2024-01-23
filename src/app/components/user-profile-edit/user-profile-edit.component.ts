import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
})
export class UserProfileEditComponent implements OnInit {
  title = 'User Profile';
  userId?: any;
  userProfile$?: Observable<UserProfile | null>;

  constructor(
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getUserProfile();
  }
}
