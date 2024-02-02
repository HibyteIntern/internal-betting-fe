import { Component, OnInit } from '@angular/core';
import { EventRequest } from '../../../entity/EventRequest';
import { EventService } from '../../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  eventId!: string;
  formData: EventRequest = new EventRequest();
  eventTemplates: any[] = []; // Add this line
  statusOptions: string[] = ['DRAFT', 'PUBLISHED', 'CANCELLED'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];

      this.eventService.getEventById(this.eventId).subscribe(
        (data: EventRequest) => {
          this.formData = new EventRequest(data);
        },
        (error) => {
          console.error('Error fetching event data:', error);
        },
      );
    });
  }

  submitForm() {
    this.eventService.updateEvent(this.eventId, this.formData).subscribe(
      (response) => {
        this.router.navigate(['/view-event', this.eventId]);
      },
      (error) => {
        console.error('Error updating event:', error);
      },
    );
  }
}
