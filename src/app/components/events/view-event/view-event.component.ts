import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../service/event.service';
import { Event } from '../../../entity/event.model';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  eventRequest?: Event;
  eventId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];

      this.fetchEventData();
    });
  }

  fetchEventData() {
    this.eventService.getEventById(this.eventId).subscribe(
      (data: Event) => {
        this.eventRequest = new Event(data);
      },
      (error) => {
        console.error('Error fetching event data:', error);
      },
    );
  }

  navigateToEditEvent() {
    this.router.navigate(['/events', 'edit', this.eventId]);
  }
}
