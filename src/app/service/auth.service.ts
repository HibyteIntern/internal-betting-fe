import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private keycloakService: KeycloakService
  ) {}

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

  public decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }
}
