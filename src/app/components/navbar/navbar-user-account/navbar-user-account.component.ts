import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-navbar-user-account',
  templateUrl: './navbar-user-account.component.html',
  styleUrls: ['./navbar-user-account.component.scss'],
})
export class NavbarUserAccountComponent implements OnInit {
  keycloakId: any;
  currentPath?: string;
  userProfile: UserProfile | null = null; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService 
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath = this.route.snapshot.firstChild?.routeConfig?.path || '';
      console.log('Current URL:', this.currentPath);

      let childRoute = this.route.firstChild;
      while (childRoute) {
        if (childRoute.snapshot.paramMap.get("keycloakId")) {
          this.keycloakId = childRoute.snapshot.paramMap.get("keycloakId");
          this.fetchUserProfile(this.keycloakId); 
          break;
        }
        childRoute = childRoute.firstChild;
      }
      console.log('keycloakId:', this.keycloakId);
    });
  }

  fetchUserProfile(keycloakId: string): void {
    this.userProfileService.getByKeycloakId(keycloakId).subscribe(profile => {
      this.userProfile = profile;
      console.log('Fetched User Profile:', this.userProfile);
    }, error => {
      console.error('Failed to fetch user profile', error);
    });
  }

  onUserProfileEdit() {
    console.log(this.userProfile?.userId);
    console.log(this.keycloakId);
    
    this.router.navigate(['/user-profile/edit/', this.userProfile?.userId]);
  }
}
