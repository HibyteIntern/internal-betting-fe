import { Component } from '@angular/core';
import { ThemeService } from '../../service/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  themeService: ThemeService;
  constructor(themeService: ThemeService) {
    this.themeService = themeService;
  }
}
