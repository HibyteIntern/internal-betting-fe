import { Component, Input } from '@angular/core';
import { EventRequest } from 'src/app/entity/EventRequest';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss', '../../shared/styles/styled-card.scss']
})
export class EventCardComponent {
  @Input() event: EventRequest = new EventRequest();
}
