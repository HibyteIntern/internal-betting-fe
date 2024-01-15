import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Competition } from 'src/app/entity/competitions.model';
import { Status } from 'src/app/entity/Status';
import { StatusIcons } from 'src/app/entity/Status';

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

  @Output() deleteEmitter = new EventEmitter<void>();
  @Output() viewEmitter = new EventEmitter<void>();
  @Output() editEmitter = new EventEmitter<void>();

  statusIcon = StatusIcons[this.competition.status]

  ngOnInit(): void {
    this.statusIcon = StatusIcons[this.competition.status]
  }

  emitViewClick() {
    this.viewEmitter.emit();
  }

  emitDeleteButtonClick() {
    this.deleteEmitter.emit();
  }

  emitEditButtonClick() {
    this.editEmitter.emit();
  }
}
