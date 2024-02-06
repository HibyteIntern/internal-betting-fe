import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Competition } from 'src/app/entity/competitions.model';
import { Status } from 'src/app/entity/Status';
import { StatusIcons } from 'src/app/entity/Status';
import { UserProfileService } from '../../../service/user-profile.service';
import { UserProfile } from '../../../entity/UserProfile';

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
    creator: '',
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
  showButtons = true;
  loggedInUser: UserProfile | null = null;

  constructor(private userProfileService: UserProfileService) {
    this.userProfileService.userProfile$.subscribe((user) => {
      this.loggedInUser = user;
      if (this.loggedInUser) {
        // this.showButtons = this.competition.creator.userId === this.loggedInUser.userId;
      }
    });
  }

  ngOnInit(): void {
    this.statusIcon = StatusIcons[this.competition.status];
  }
}
