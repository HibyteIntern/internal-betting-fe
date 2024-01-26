import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventRequest } from 'src/app/entity/EventRequest';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: [
    './event-card.component.scss',
    '../../shared/styles/styled-card.scss',
  ],
})
export class EventCardComponent {
  @Input() event: EventRequest = new EventRequest();

  @Output() deleteEmitter = new EventEmitter<void>();
  @Output() viewEmitter = new EventEmitter<void>();
  @Output() editEmitter = new EventEmitter<void>();
}
