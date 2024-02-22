import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventRequest } from 'src/app/entity/event-request.model';
import { UserProfileService } from '../../service/user-profile.service';
import { FullUserProfile } from '../../entity/full-user-profile';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: [
    './event-card.component.scss',
    '../../shared/styles/styled-card.scss',
  ],
})
export class EventCardComponent {
  @Input() event: EventRequest = new EventRequest();

  @Output() deleteEmitter = new EventEmitter<void>();
  @Output() viewEmitter = new EventEmitter<void>();
  @Output() editEmitter = new EventEmitter<void>();

  showButtons = false;
  loggedInUser: FullUserProfile | null = null;
  constructor(private userProfileService: UserProfileService) {
    this.userProfileService.userProfile$.subscribe((user) => {
      this.loggedInUser = user;
      if (this.loggedInUser) {
        this.showButtons =
          this.event.creator?.userId === this.loggedInUser.userId;
      }
    });
  }
}
