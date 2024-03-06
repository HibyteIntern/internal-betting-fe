import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { FullUserProfile } from 'src/app/entity/full-user-profile';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public darkModeChecked = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public userKeycloakId = '';
  public username = '';
  public response: string | null = null;
  public appUserProfile: FullUserProfile | null = null;
  private subscription?: Subscription;

  userProfileObs$?: Observable<FullUserProfile | null>;
  finishLogin = false;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private router: Router,
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.authService.loadUserProfile();
      await this.authService.getToken();
      await this.userProfileService.checkUserProfile(this.userProfile);

      this.finishLogin = true;
    }
    if (!this.isLoggedIn) {
      this.authService.login();
    }

    if (this.finishLogin) {
      this.subscription = this.userProfileService.getMe().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }
}
