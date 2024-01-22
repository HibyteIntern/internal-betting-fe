import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit, OnDestroy{
  title = "User Profile" 
  userId?: any;
  userProfile$?: Observable<UserProfile | null>;
  private subscription = new Subscription();
 
  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.subscription.add(
      this.userProfileService.userId$.subscribe(userId => {
        if (userId) {
          this.userId = userId;
          this.fetchUserProfile(this.userId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchUserProfile(userId: number): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getById(userId);
  }

}

