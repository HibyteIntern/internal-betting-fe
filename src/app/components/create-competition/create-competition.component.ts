import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from 'src/app/entity/Status';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.scss']
})
export class CreateCompetitionComponent {
  competitionForm: FormGroup;

  searchValue = '';

  userOptions = [
    'sarah',
    'james',
    'joe',
    'john',
    'jane',
    'jimmy',
    'jessica',
    'jennifer',
    'julie',
    'jacob',
  ];

  userGroupOptions = [
    'group1',
    'group2',
    'group3',
    'group4',
    'group5',
    'group6',
    'group7',
    'group8',
    'group9',
    'group10',
  ];

  eventOptions = [
    'event1',
    'event2',
    'event3',
    'event4',
    'event5',
    'event6',
    'event7',
    'event8',
    'event9',
    'event10',
  ]

  statusOptions = [
    { value: Status.DRAFT, label: 'Draft' },
    { value: Status.OPEN, label: 'Open' },
    { value: Status.CLOSED, label: 'Closed' },
  ]
  selectedStatus = Status.DRAFT;

  constructor () {
    this.competitionForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      userProfiles: new FormControl<string[]>([]),
      userGroups: new FormControl<string[]>([]),
      events: new FormControl<string[]>([]),
      status: new FormControl(Status.DRAFT),
    });
  }

  search(value: string) {
    this.searchValue = value;
  }

  handleUserSelect(users: string[]) {
    this.competitionForm.patchValue({
      userProfiles: users
    });
  }

  handleUserGroupSelect(userGroups: string[]) {
    this.competitionForm.patchValue({
      userGroups: userGroups
    });
  }

  handleEventSelect(events: string[]) {
    this.competitionForm.patchValue({
      events: events
    });
  }

  onSubmit() {
    this.competitionForm.patchValue({
      status: this.selectedStatus
    });
    console.log(this.competitionForm.value)
  }
}
