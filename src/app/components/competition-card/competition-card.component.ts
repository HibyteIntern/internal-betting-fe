import { Component, Input, Output } from '@angular/core';
import { Competition } from 'src/app/entity/Competitions';
import { Status } from 'src/app/entity/Status';

@Component({
  selector: 'app-competition-card',
  templateUrl: './competition-card.component.html',
  styleUrls: ['./competition-card.component.scss', '../../shared/styles/styled-card.scss']
})
export class CompetitionCardComponent {
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
    status: Status.DRAFT
  };
}
