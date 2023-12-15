import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SampleService } from '../../service/sample.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { UserProfile } from 'src/app/entity/UserProfile';
import { Observable } from 'rxjs';



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


  constructor(
    private keycloak: KeycloakService,
    private sample: SampleService,
    private userProfileService: UserProfileService,

    
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      const token = await this.keycloak.getToken();
      const payload = this.decodeToken(token);
      this.userKeycloakId = payload.sub;

      this.userProfileObs$ = this.userProfileService.userProfile$;
      this.userProfileService.checkUserProfile(this.userKeycloakId, this.userProfile);

      this.userProfileObs$.subscribe(data => {
        console.log(data);
      })
    
      this.sample.getSample().subscribe((data) => {
        this.response = data;
      });
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
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
