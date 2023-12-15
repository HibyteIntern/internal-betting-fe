import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}

 
  public toggleTheme() {
    this.themeService.toggleTheme();
  }
}
