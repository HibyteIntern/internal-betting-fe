import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-account-page-user-profile',
  templateUrl: './account-page-user-profile.component.html',
  styleUrls: ['./account-page-user-profile.component.scss'],
})
export class AccountPageUserProfileComponent implements OnInit, OnDestroy {
  @Input() username?: string;
  @Input() profilePicture?: number;
  @Output() edit = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  private photoSubscription?: Subscription;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    if (this.profilePicture) {
      this.photoSubscription = this.userProfileService
        .getPhoto()
        .subscribe((blob) => {
          this.userProfileService.displayProfileImage(blob, '.profile-circle');
        });
    }
  }

  ngOnDestroy(): void {
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
  }

}
