import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {EventRequest} from "../../../entity/EventRequest";
import {EventTemplate} from "../../../entity/EventTemplate";
import {CompleteBetType} from "../../../entity/CompleteBetType";
import {BetTemplateType} from "../../../entity/BetTemplateType";
import {EventService} from "../../../service/event.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  formData: EventRequest = new EventRequest();
  eventTemplates: EventTemplate[] = [
    {
      id: 1,
      name: 'Football game',
      betTemplates: [
        { id: 1, name: 'Goal Count', type: BetTemplateType.NUMERIC },
        { id: 2, name: 'Winner', type: BetTemplateType.STRING },
        { id: 3, name: 'Over/Under', type: BetTemplateType.NUMERIC },
      ]
    },
    {
      id: 2,
      name: 'Curve Fever',
      betTemplates: [
        { id: 4, name: 'High Score', type: BetTemplateType.NUMERIC },
        { id: 5, name: 'Winner', type: BetTemplateType.STRING },
        { id: 6, name: 'Powerup Choice', type: BetTemplateType.MULTIPLE_CHOICE, multipleChoiceOptions: ['Speed Boost', 'Invisibility', 'Invincibility'] },
      ]
    },
  ];
  userGroupsControl = new FormControl();
  userProfilesControl = new FormControl();

  userGroupsList: string[] = ['Group1', 'Group2', 'Group3'];
  userProfilesList: string[] = ['Profile1', 'Profile2', 'Profile3'];

  constructor(private eventService: EventService) {}
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
