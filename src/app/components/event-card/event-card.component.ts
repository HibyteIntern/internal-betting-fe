import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/entity/event.model';
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
export class EventCardComponent implements OnInit {
  @Input() event: Event | null = null;

  @Output() deleteEmitter = new EventEmitter<void>();
  @Output() viewEmitter = new EventEmitter<void>();
  @Output() editEmitter = new EventEmitter<void>();

  showButtons = false;
  loggedInUser: FullUserProfile | null = null;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$.subscribe((user) => {
      this.loggedInUser = user;
      if (user && this.event) {
        this.showButtons = this.event.creator?.userId === user.userId;
      }
    });
  }
}
