import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventRequest } from "../../../entity/EventRequest";
import { EventTemplate } from "../../../entity/EventTemplate";
import { CompleteBetType } from "../../../entity/CompleteBetType";
import { BetTemplateType } from "../../../entity/BetTemplateType";
import { UserProfile } from "../../../entity/UserProfile";
import { Status } from "../../../entity/Status";
import {EventService} from "../../../service/event.service";
import {EventTemplateService} from "../../../service/event-template.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  formData: EventRequest = new EventRequest();
  eventTemplates: EventTemplate[] = [];
  userGroupsControl = new FormControl();
  userProfilesControl = new FormControl();

  userGroupsList: string[] = ['Group1', 'Group2', 'Group3'];
  userProfilesList: UserProfile[] = [
    { userId: 1, keycloakId: 'key1', username: 'User1', profilePicture: 1, description: 'Description1', bets: [], coins: 50 },
    { userId: 2, keycloakId: 'key2', username: 'User2', profilePicture: 2, description: 'Description2', bets: [], coins: 50 },
    // Add more profiles as needed
  ];
  statusOptions: Status[] = [Status.DRAFT, Status.OPEN, Status.CLOSED];

  constructor(private eventTemplateService: EventTemplateService , private eventService :EventService) {}

  ngOnInit() {
    // Call the method from the service to fetch event templates on component initialization
    this.eventTemplateService.getData().subscribe((data: { entity: EventTemplate[]; }) => {
      this.eventTemplates = data.entity;
    });
  }

  private convertBetTemplateType(type: BetTemplateType): string {
    return type.toString();
  }

  private convertBetTemplatesToCompleteBetTypes() {
    const selectedEventTemplate = this.eventTemplates.find(template => template.name === this.formData.selectedTemplate);

    if (selectedEventTemplate) {
      this.formData.completeBetTypeDtoList = selectedEventTemplate.betTemplates.map(betTemplate => {
        const completeBetType: CompleteBetType = {
          name: betTemplate.name,
          type: this.convertBetTemplateType(betTemplate.type),
          multipleChoiceOptions: betTemplate.multipleChoiceOptions || [],
        };
        return completeBetType;
      });
    }
  }

  submitForm() {
    this.convertBetTemplatesToCompleteBetTypes()
    console.log('Form Data:', this.formData);
    // Use the event service to add the event
    // This assumes that the event service has a method like addEvent(formData: EventRequest)
    this.eventService.addEvent(this.formData).subscribe(
      response => {
        console.log('Event added successfully:', response);
      },
      error => {
        console.error('Error adding event:', error);
      }
    );
  }
}
