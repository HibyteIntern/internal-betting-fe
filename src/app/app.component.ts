import { Component, OnInit } from '@angular/core';
import { ThemeService } from './service/theme.service';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}

  options = ['One', 'Two', 'Three'];
  selectedOptions: string[] = [];

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public handleSelectedOptions(selectedOptions: string[]) {
    this.selectedOptions = selectedOptions;

    console.log(this.selectedOptions)
  }
}
