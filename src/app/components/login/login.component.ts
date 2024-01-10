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
  public userKeycloakId: string  = '';
  public username: string = '';
  public response: string | null = null;
  public appUserProfile: UserProfile | null = null;


  userProfileObs$?: Observable<UserProfile | null>;
  finishLogin: boolean = false;
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
      const token = await this.authService.getToken();
      this.userKeycloakId = this.decodeToken(token).sub;

      await this.userProfileService.checkUserProfile(this.userKeycloakId, this.userProfile);

      this.finishLogin = true;
    }

    if(this.finishLogin){
      
      this.userProfileService.getByKeycloakId(this.userKeycloakId).subscribe(user => {
        this.router.navigate(['/home', user.userId]);
      })
      localStorage.getItem('acc')
    }
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public login() {
    this.authService.login();
  }
  
  public logout() {
    this.authService.logout();
  }
}
