import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UserProfile } from '../../../entity/UserProfile';
import { Status } from '../../../entity/Status';
import { EventService } from '../../../service/event.service';
import { EventTemplateService } from '../../../service/event-template.service';
import { EventTemplate } from '../../../entity/event-template.model';
import { BetTemplateType } from '../../../entity/bet-template-type';
import { UserProfileService } from "../../../service/user-profile.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup

  minStartsAtDate = new Date();

  eventTemplates: EventTemplate[] = [];
  userGroupsList: string[] = [];
  userProfilesList: UserProfile[] = [];
  statusOptions: Status[] = [Status.DRAFT, Status.OPEN, Status.CLOSED];

  constructor(
    private fb: FormBuilder,
    private eventTemplateService: EventTemplateService,
    private eventService: EventService,
    private userProfilesService: UserProfileService,
  ) {
    this.eventForm = this.fb.group({
      // Initialize form controls and groups for other parts of EventRequest
      name: [''],
      description: [''],
      startsAt: [],
      endsAt: [],
      status: [Status.DRAFT],
      selectedTemplate: [''],
      completeBetTypeDtoList: this.fb.control([]),
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
  }

  private convertBetTemplateType(type: BetTemplateType): string {
    return type.toString();
  }

  // private convertBetTemplatesToCompleteBetTypes() {
  //   const selectedEventTemplate = this.eventTemplates.find(
  //     (template) => template.name === this.formData.selectedTemplate,
  //   );
  //
  //   if (selectedEventTemplate) {
  //     this.formData.completeBetTypeDtoList =
  //       selectedEventTemplate.betTemplates.map((betTemplate) => {
  //         const completeBetType: CompleteBetType = {
  //           name: betTemplate.name,
  //           type: this.convertBetTemplateType(betTemplate.type),
  //           multipleChoiceOptions: betTemplate.multipleChoiceOptions || [],
  //         };
  //         return completeBetType;
  //       });
  //   }
  // }

  submitForm() {
    console.log('Form data:', this.eventForm.value);
    // this.convertBetTemplatesToCompleteBetTypes();
    this.eventService.addEvent(this.eventForm.value).subscribe(() => {
      window.history.back();
    }, (error) => {
      console.error('Error adding event:', error);
    });
  }
}
