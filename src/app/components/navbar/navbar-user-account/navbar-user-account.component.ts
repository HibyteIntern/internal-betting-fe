import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { AuthService } from 'src/app/service/auth.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-navbar-user-account',
  templateUrl: './navbar-user-account.component.html',
  styleUrls: ['./navbar-user-account.component.scss'],
})
export class NavbarUserAccountComponent implements OnInit, OnDestroy {
  userId: any;
  currentPath?: string;
  userProfile: UserProfile | null = null;
  userProfile$?: Observable<UserProfile | null>;
  showAlertBox = false;
  isLoggedIn = false;
  private userProfileSubscription?: Subscription;

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.userProfileSubscription =
          this.userProfileService.userId$.subscribe((userId) => {
            if (userId) {
              this.userId = userId;
              this.fetchUserProfile(this.userId);
            }
          });
      });
    this.isLoggedIn = await this.authService.isLoggedIn();
  }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }

  fetchUserProfile(userId: number): void {
    this.userProfile$ = this.userProfileService.userProfile$;
    this.userProfileService.getById(userId);

    this.userProfile$.subscribe((user) => {
      this.userProfile = user;
      if (this.userProfile?.userId) {
        this.fetchProfileImage(this.userProfile?.userId);
      }
    });
  }

  fetchProfileImage(userId: number) {
    this.userProfileService.getPhoto(userId).subscribe((blob) => {
      this.displayProfileImage(blob);
    });
  }

  displayProfileImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector('#account-image') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
    this.closeAlertBox();
  }

  onUserProfileEdit() {
    this.router.navigate(['/user-profile/edit/', this.userProfile?.userId]);
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
