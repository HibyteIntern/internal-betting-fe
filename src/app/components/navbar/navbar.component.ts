import { Component } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  themeService: ThemeService;
  router: Router;
  constructor(themeService: ThemeService, router: Router) {
    this.themeService = themeService;
    this.router = router;
  }

  goBack() {
    window.history.back();
  }
}
