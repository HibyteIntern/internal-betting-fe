import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/entity/Status';
import { CompetitionService } from 'src/app/service/competition.service';
import { EventService } from 'src/app/service/event.service';
import { UserProfileService } from 'src/app/service/user-profile.service';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.scss']
})
export class CreateCompetitionComponent implements OnInit {
  competitionForm: FormGroup;

  searchValue = '';

  userOptions:string[] = [];

  userGroupOptions:string[] = [
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
  ];

  statusOptions = [
    { value: Status.DRAFT, label: 'Draft' },
    { value: Status.OPEN, label: 'Open' },
    { value: Status.CLOSED, label: 'Closed' },
  ]
  selectedStatus = Status.DRAFT;

  constructor (
    private userProfileService: UserProfileService, 
    private competitionService: CompetitionService,
    private eventsService: EventService, 
    private router: Router
  ) {
    this.competitionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      users: new FormControl<number[]>([]),
      userProfiles: new FormControl<string[]>([]),
      userGroups: new FormControl<string[]>([]),
      events: new FormControl<string[]>([]),
      status: new FormControl(Status.DRAFT),
    });
  }

  ngOnInit(): void {
    this.userOptions = [];
    this.eve
    // this.userProfileService.getAll().subscribe(users => {
    //   console.log(users)
    //   users.forEach(user => {
    //     if(user.username) {
    //       this.userOptions.push(user.username);
    //     }
    //   });
    // });
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
    // this.competitionForm.patchValue({
    //   status: this.selectedStatus
    // });
    // console.log(this.competitionForm.value)
    this.competitionService.addCompetition(this.competitionForm.value).subscribe(response => {
      this.router.navigate(['/']);
    });
  }
}
