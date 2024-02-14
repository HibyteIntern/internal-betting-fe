import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FullUserProfile } from 'src/app/entity/full-user-profile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.scss'],
})
export class BetsListComponent implements OnInit {
  userProfile$?: Observable<FullUserProfile | null>;

  constructor(private userProfileService: UserProfileService) {}
  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getUserProfile();
  }
}
