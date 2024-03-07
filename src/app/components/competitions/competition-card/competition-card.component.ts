import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Competition } from 'src/app/entity/competitions.model';
import { Status } from 'src/app/entity/Status';
import { StatusIcons } from 'src/app/entity/Status';
import { UserProfileService } from '../../../service/user-profile.service';
import { FullUserProfile } from '../../../entity/full-user-profile';

@Component({
  selector: 'app-competition-card',
  templateUrl: './competition-card.component.html',
  styleUrls: [
    './competition-card.component.scss',
    '../../../shared/styles/styled-card.scss',
  ],
})
export class CompetitionCardComponent implements OnInit {
  @Input() competition: Competition = {
    id: 0,
    name: '',
    description: '',
    creator: undefined,
    users: [],
    userGroups: [],
    userProfiles: [],
    events: [],
    created: new Date(),
    lastModified: new Date(),
    status: Status.DRAFT,
  };

  @Output() deleteEmitter = new EventEmitter<void>();
  @Output() viewEmitter = new EventEmitter<void>();
  @Output() editEmitter = new EventEmitter<void>();

  statusIcon = StatusIcons[this.competition.status];
  showButtons = false;
  loggedInUser: FullUserProfile | null = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$.subscribe((user) => {
      this.loggedInUser = user;
      if (this.loggedInUser && this.competition.creator) {
        this.showButtons =
          this.competition.creator.userId === this.loggedInUser.userId;
      }
    });
    this.statusIcon = StatusIcons[this.competition.status];
  }
}
