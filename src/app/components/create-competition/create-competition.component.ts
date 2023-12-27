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
  selectedUsers: string[] = [];

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
  selectedUserGroups: string[] = [];

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
  selectedEvents: string[] = [];

  constructor () {
    this.competitionForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      users: new FormControl([]),
      userGroups: new FormControl([]),
      userProfiles: new FormControl([]),
      events: new FormControl([]),
      status: new FormControl(Status.DRAFT),
    });
  }

  search(value: string) {
    this.searchValue = value;

    console.log(this.searchValue)
  }

  handleUserSelect(users: string[]) {
    this.selectedUsers = users;
  }

  handleUserGroupSelect(userGroups: string[]) {
    this.selectedUserGroups = userGroups;
  }

  handleEventSelect(events: string[]) {
    this.selectedEvents = events;
  }
}
