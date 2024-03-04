import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from 'src/app/entity/Status';
import { CompetitionService } from 'src/app/service/competition.service';
import { EventService } from 'src/app/service/event.service';
import { UserProfileService } from 'src/app/service/user-profile.service';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.scss'],
})
export class  CreateCompetitionComponent implements OnInit {
  competitionForm: FormGroup;

  searchValue = '';

  userOptions: string[] = [];
  selectedUsers: string[] = [];

  userGroupOptions: string[] = [];
  selectedUserGroups: string[] = [];

  eventOptions: string[] = [];
  selectedEvents: string[] = [];

  isEditPage = false;
  isLoading = false;

  statusOptions = [
    { value: Status.DRAFT, label: 'Draft' },
    { value: Status.OPEN, label: 'Open' },
    { value: Status.CLOSED, label: 'Closed' },
  ];
  selectedStatus = Status.DRAFT;

  constructor(
    private competitionService: CompetitionService,
    private eventsService: EventService,
    private userProfileService: UserProfileService,
    private userGroupService: GroupService,
    private router: Router,
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
    this.isEditPage = this.router.url.includes('edit');

    if (this.isEditPage) {
      this.competitionService
        .getCompetitionById(parseInt(this.router.url.split('/')[3]))
        .subscribe((competition) => {
          this.competitionForm.patchValue({
            name: competition.name,
            description: competition.description,
            users: competition.users,
            userProfiles: competition.userProfiles,
            userGroups: competition.userGroups,
            events: competition.events,
            status: competition.status,
          });

          this.selectedUsers = competition.userProfiles;
          this.selectedUserGroups = competition.userGroups;
          this.selectedEvents = competition.events.map((event) => event.name);
        });
    }

    this.eventOptions = [];
    this.userOptions = [];
    this.userGroupOptions = [];

    this.eventsService.getEvents().subscribe((events) => {
      events.forEach((event) => {
        if (event.name && !this.selectedEvents.includes(event.name)) {
          this.eventOptions.push(event.name);
        }
      });
    });

    this.userProfileService.getAll().subscribe((users) => {
      users.forEach((user) => {
        if (user.username && !this.selectedUsers.includes(user.username)) {
          this.userOptions.push(user.username);
        }
      });
    });

    this.userGroupService.getAll().subscribe((groups) => {
      groups.forEach((group) => {
        if (
          group.groupName &&
          !this.selectedUserGroups.includes(group.groupName)
        ) {
          this.userGroupOptions.push(group.groupName);
        }
      });
    });
  }

  search(value: string) {
    this.searchValue = value;
  }

  handleUserSelect(users: string[]) {
    this.competitionForm.patchValue({
      userProfiles: users,
    });
  }

  handleUserGroupSelect(userGroups: string[]) {
    this.competitionForm.patchValue({
      userGroups: userGroups,
    });
  }

  handleEventSelect(events: string[]) {
    this.competitionForm.patchValue({
      events: events,
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.isEditPage) {
      this.competitionService
        .updateCompetition(
          parseInt(this.router.url.split('/')[3]),
          this.competitionForm.value,
        )
        .subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/']);
        });
    } else {
      this.competitionService
        .addCompetition(this.competitionForm.value)
        .subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/']);
        });
    }
  }
}
