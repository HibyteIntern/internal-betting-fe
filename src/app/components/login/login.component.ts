import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SampleService } from '../../service/sample.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public darkModeChecked = false;

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public response: string | null = null;

  constructor(
    private keycloak: KeycloakService,
    private sample: SampleService,
  ) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.sample.getSample().subscribe((data) => {
        this.response = data;
      });
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
