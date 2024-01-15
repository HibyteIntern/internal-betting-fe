import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss']
})
export class BetsListComponent implements OnInit, OnDestroy{
  userProfile$?: Observable<UserProfile | null>;
  private userProfileSubscription?: Subscription; 
 
  constructor(private userProfileService: UserProfileService){}
              
  ngOnInit(): void {
    this.userProfileSubscription = this.userProfileService.userId$.subscribe(userId => {
      if (userId) {
        this.fetchUserProfile(userId); 
      }
    });
  }

  fetchUserProfile(userId: number): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getById(userId);
  
    this.userProfile$.subscribe(user => {
    console.log(user);
  });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription?.unsubscribe();
  }
}
