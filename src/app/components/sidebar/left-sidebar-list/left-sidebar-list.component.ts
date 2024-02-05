import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar-list',
  templateUrl: './left-sidebar-list.component.html',
  styleUrls: ['./left-sidebar-list.component.scss'],
})
export class LeftSidebarListComponent {
  constructor(protected router: Router) {}

  navigateToIndex() {
    this.router.navigate(['/']);
  }

  navigateToCreateCompetition() {
    this.router.navigate(['/competitions/create']);
  }

  navigateToCreateEvent(){
    this.router.navigate(['/create-event'])
  }
}
