import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserProfile } from 'src/app/entity/UserProfile';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-account-page-user-profile',
  templateUrl: './account-page-user-profile.component.html',
  styleUrls: ['./account-page-user-profile.component.scss']
})
export class AccountPageUserProfileComponent{
  
}
