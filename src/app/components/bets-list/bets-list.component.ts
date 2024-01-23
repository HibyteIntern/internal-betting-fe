import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss'],
})
export class BetsListComponent implements OnInit {
  userProfile$?: Observable<UserProfile | null>;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getUserProfile();
  }
}
