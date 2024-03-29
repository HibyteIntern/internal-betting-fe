import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventTemplate } from '../../../../entity/event-template.model';

@Component({
  selector: 'app-event-template-list',
  templateUrl: './event-template-list.component.html',
  styleUrls: ['./event-template-list.component.scss'],
})
export class EventTemplateListComponent {
  @Input() eventTemplates: EventTemplate[] = [];
  @Output() delete = new EventEmitter<number>();
}
