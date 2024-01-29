import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { UserProfile } from 'src/app/entity/UserProfile';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public darkModeChecked = false;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public userKeycloakId = '';
  public username = '';
  public response: string | null = null;
  public appUserProfile: UserProfile | null = null;

  userProfileObs$?: Observable<UserProfile | null>;
  finishLogin = false;
  userId?: number;

  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private router: Router,
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.authService.loadUserProfile();
      this.userProfile = await this.authService.loadUserProfile();
      const token = await this.authService.getToken();

      this.userKeycloakId = this.authService.decodeToken(token).sub;
      await this.userProfileService.checkUserProfile(
        this.userKeycloakId,
        this.userProfile,
      );

      this.finishLogin = true;
    }
    if (!this.isLoggedIn) {
      this.authService.login();
    }

    if (this.finishLogin) {
      this.userProfileService
        .getByKeycloakId(this.userKeycloakId)
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
      localStorage.getItem('acc');
    }
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }
}
