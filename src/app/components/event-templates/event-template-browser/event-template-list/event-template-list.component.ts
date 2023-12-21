import {Component, Input} from '@angular/core';
import {EventTemplate} from "../../../../entity/EventTemplate";

@Component({
  selector: 'app-event-template-list',
  templateUrl: './event-template-list.component.html',
  styleUrls: ['./event-template-list.component.scss']
})
export class EventTemplateListComponent {
  @Input() eventTemplates: EventTemplate[] = [];
}
