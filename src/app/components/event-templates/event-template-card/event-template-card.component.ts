import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventTemplate } from '../../../entity/EventTemplate';

@Component({
  selector: 'app-event-template-card',
  templateUrl: './event-template-card.component.html',
  styleUrls: ['./event-template-card.component.scss'],
})
export class EventTemplateCardComponent {
  @Input() template?: EventTemplate;
  @Output() delete = new EventEmitter<number>();
}
