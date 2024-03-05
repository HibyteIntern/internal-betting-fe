import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Status } from '../../../entity/Status';
import { EventService } from '../../../service/event.service';
import { EventTemplateService } from '../../../service/event-template.service';
import { EventTemplate } from '../../../entity/event-template.model';
import { UserProfileService } from '../../../service/user-profile.service';
import { FullUserProfile } from '../../../entity/full-user-profile';
import { GroupService } from '../../../service/group.service';
import { FullUserGroupModel } from '../../../entity/full-user-group.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  minStartsAtDate = new Date();

  isLoading = false;
  errorMessage = '';

  eventTemplates: EventTemplate[] = [];
  userGroupsList: FullUserGroupModel[] = [];
  userProfilesList: FullUserProfile[] = [];
  statusOptions: Status[] = [Status.DRAFT, Status.OPEN, Status.CLOSED];

  constructor(
    private fb: FormBuilder,
    private eventTemplateService: EventTemplateService,
    private eventService: EventService,
    private userProfilesService: UserProfileService,
    private groupService: GroupService,
  ) {
    this.eventForm = this.fb.group({
      eventTemplateName: [''],
      name: [''],
      description: [''],
      startsAt: [],
      endsAt: [],
      status: [Status.DRAFT],
      selectedTemplate: [''],
      betTypeDtoList: this.fb.control([]),
      userGroups: this.fb.control([]),
      userProfiles: this.fb.control([]),
    });
  }

  ngOnInit() {
    this.eventTemplateService.getData().subscribe(
      (data: EventTemplate[]) => {
        this.eventTemplates = data;
      },
      (error) => {
        console.error('Error fetching event templates:', error);
      },
    );

    this.userProfilesService.getAll().subscribe(
      (profiles) => {
        this.userProfilesList = profiles;
      },
      (error) => {
        console.error('Error fetching user profiles:', error);
      },
    );

    this.groupService.getAll().subscribe(
      (groups) => {
        this.userGroupsList = groups;
      },
      (error) => {
        console.error('Error fetching user groups:', error);
      },
    );

    this.eventForm.get('eventTemplateName')?.valueChanges.subscribe(() => {
      this.handleEventTemplateChange();
    });
  }

  private mapEventTemplateToBetTypeList(eventTemplate: EventTemplate) {
    return eventTemplate.betTemplates.map((betTemplate) => {
      return {
        name: betTemplate.name,
        options: betTemplate.options || [],
      };
    });
  }

  handleEventTemplateChange() {
    if (this.eventForm.get('eventTemplateName')?.value === 'Custom') {
      this.eventForm.patchValue({
        betTypeDtoList: [],
      });
      return;
    }

    const selectedEventTemplate = this.eventTemplates.find(
      (template) =>
        template.name === this.eventForm.get('eventTemplateName')?.value,
    );

    if (selectedEventTemplate) {
      this.eventForm.patchValue({
        betTypeDtoList: this.mapEventTemplateToBetTypeList(
          selectedEventTemplate,
        ),
      });
    }
    // Allow time for the DOM to update
    setTimeout(() => {
      const section = document.getElementById('bet-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  submitForm() {
    this.isLoading = true;
    this.errorMessage = '';
    this.eventService.addEvent(this.eventForm.value).subscribe(
      () => {
        this.isLoading = false;
        window.history.back();
      },
      () => {
        this.isLoading = false;
        this.errorMessage = 'Something went wrong. Please try again.';
      },
    );
  }
}
