import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SampleService } from '../../service/sample.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { UserProfile } from 'src/app/entity/UserProfile';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



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
    private keycloak: KeycloakService,
    private sample: SampleService,
    private userProfileService: UserProfileService,
    private router: Router,
    
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      const token = await this.keycloak.getToken();
      const payload = this.decodeToken(token);
      this.userKeycloakId = payload.sub;

      this.userProfileService.checkUserProfile(this.userKeycloakId, this.userProfile);

    
      this.sample.getSample().subscribe((data) => {
        this.response = data;
      });

      this.finishLogin = true;

    }

    if(this.finishLogin){

      this.userProfileService.getByKeycloakId(this.userKeycloakId).subscribe(user => {
        this.router.navigate(['/home', user.userId]);
      })
      
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
