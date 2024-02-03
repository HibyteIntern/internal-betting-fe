import { Component, OnInit } from '@angular/core';
import { EventRequest } from '../../../entity/event-request.model';
import { EventService } from '../../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from "../../../entity/Status";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  eventId!: string;
  formData: EventRequest = new EventRequest();
  eventTemplates: any[] = []; // Add this line
  statusOptions: string[] = [Status.DRAFT, Status.OPEN, Status.CLOSED];

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
      () => {
        this.router.navigate(['/events', this.eventId]);
      },
      (error) => {
        console.error('Error updating event:', error);
      },
    );
  }
}
