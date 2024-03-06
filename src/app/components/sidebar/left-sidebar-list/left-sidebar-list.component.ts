import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../../service/user-profile.service';
import { FullUserProfile } from '../../../entity/full-user-profile';

@Component({
  selector: 'app-left-sidebar-list',
  templateUrl: './left-sidebar-list.component.html',
  styleUrls: ['./left-sidebar-list.component.scss'],
})
export class LeftSidebarListComponent {
  userProfile: FullUserProfile | null = null;
  constructor(
    protected router: Router,
    protected userProfileService: UserProfileService,
  ) {
    this.userProfileService.userProfile$.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }

  navigateToIndex() {
    this.router.navigate(['/']);
  }

  navigateToCreateCompetition() {
    this.router.navigate(['/competitions/create']);
  }

  navigateToCreateEvent() {
    this.router.navigate(['/events/create']);
  }

  isActiveRoute(route: string): boolean {
    if (route === '/' && this.router.url === '/') return true;
    else if (this.router.url !== '/' && route !== '/')
      return this.router.url.includes(route);
    return false;
  }
}
