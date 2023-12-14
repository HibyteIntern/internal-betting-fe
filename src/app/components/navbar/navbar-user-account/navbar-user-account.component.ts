import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-user-account',
  templateUrl: './navbar-user-account.component.html',
  styleUrls: ['./navbar-user-account.component.scss'],
})
export class NavbarUserAccountComponent {

  constructor(private router: Router){}

  onUserProfileEdit(){
    this.router.navigate(['/user-profile/edit']);
  }
}
