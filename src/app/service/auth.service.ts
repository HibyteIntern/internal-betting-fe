import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  async loadUserProfile() {
    return await this.keycloakService.loadUserProfile();
  }

  async getToken(): Promise<string> {
    return await this.keycloakService.getToken();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
