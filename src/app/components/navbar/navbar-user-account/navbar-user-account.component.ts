import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { FullUserProfile } from 'src/app/entity/full-user-profile';
import { AuthService } from 'src/app/service/auth.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-navbar-user-account',
  templateUrl: './navbar-user-account.component.html',
  styleUrls: ['./navbar-user-account.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(100)]),
      transition(':leave', [animate(100, style({ opacity: 0 }))]),
    ]),
  ],
})
export class NavbarUserAccountComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  userProfile: FullUserProfile | null = null;
  showAlertBox = false;
  isLoggedIn = false;
  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(this.unsubscribe$),
        )
        .subscribe(() => {
          this.fetchUserProfile();
        });

      this.userProfileService.userProfile$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((profile) => {
          this.userProfile = profile;
          if (profile?.userId) {
            this.fetchProfileImage();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchUserProfile(): void {
    this.userProfileService.getUserProfile();
  }

  fetchProfileImage() {
    this.userProfileService
      .getPhoto()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (blob) => {
          if (blob.size > 0) {
            this.userProfileService.displayProfileImageForSelector(
              blob,
              '#account-image',
            );
          } else {
            console.error('Fetched blob is empty.');
          }
        },
        (error) => {
          console.error('Error fetching profile image:', error);
        },
      );
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
    this.closeAlertBox();
  }

  onUserProfileEdit() {
    this.router.navigate(['/user-profile/edit']);
    this.showAlertBox = false;
  }

  onCancel() {
    this.closeAlertBox();
  }

  openAlertBox() {
    this.showAlertBox = true;
  }

  closeAlertBox() {
    this.showAlertBox = false;
  }
}
