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
  @Input() description?: string;
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
          this.displayProfileImage(blob);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.photoSubscription) {
      this.photoSubscription.unsubscribe();
    }
  }

  displayProfileImage(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const circle = document.querySelector('.profile-circle') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }
}
