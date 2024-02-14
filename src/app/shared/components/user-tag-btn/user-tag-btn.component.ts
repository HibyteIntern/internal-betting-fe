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
  selector: 'app-user-tag-btn',
  templateUrl: './user-tag-btn.component.html',
  styleUrls: ['./user-tag-btn.component.scss'],
})
export class UserTagBtnComponent implements OnInit, OnDestroy {
  @Input() id = 0;
  @Input() functionality = 'remove';
  @Input() userId = 0;
  @Input() name = '';
  @Input() description = '';
  @Input() profilePicture = 0;
  @Output() clickEvent = new EventEmitter<number>();
  private photoSubscription?: Subscription;
  isUser = false;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    if (this.profilePicture) {
      this.isUser = true;
      this.photoSubscription = this.userProfileService
        .getPhotoById(this.userId)
        .subscribe((blob) => {
          this.displayProfileImage(blob, this.userId);
        });
    }
  }

  ngOnDestroy(): void {
    this.photoSubscription?.unsubscribe();
  }

  onClick(): void {
    this.clickEvent.emit(this.id);
  }

  displayProfileImage(blob: Blob, userId: number) {
    const url = URL.createObjectURL(blob);
    const circle = document.getElementById(
      `profile-circle-${userId}`,
    ) as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${url})`;
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
    }
  }
}
