import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit{
  title = "User Profile" 
  userId?: any;

  userProfile$?: Observable<UserProfile | null>;
 
  constructor(private userProfileService: UserProfileService,
              private route: ActivatedRoute){}
  

  ngOnInit(): void {
    this.userProfileService.userId$.subscribe(userId => {
      if (userId) {
        this.userId = userId;
        this.fetchUserProfile(this.userId); 
      }
      console.log('userId:', this.userId);
    });
  }

  fetchUserProfile(userId: number): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getById(userId);
  }

}


