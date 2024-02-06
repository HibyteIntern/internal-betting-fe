import { Component, OnInit } from '@angular/core';
import { EventRequest } from '../../../entity/event-request.model';
import { EventService } from '../../../service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../../entity/Status';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  eventId!: string;
  formData: EventRequest = new EventRequest();
  statusOptions: string[] = [Status.DRAFT, Status.OPEN, Status.CLOSED];
  minStartsAtDate = new Date();

  isLoading = false;
  errorMessage = '';

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
        () => {
          this.errorMessage = 'Error fetching event data';
        },
      );
    });
  }

  submitForm() {
    this.isLoading = true;
    this.errorMessage = '';
    this.eventService.updateEvent(this.eventId, this.formData).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/events', this.eventId]);
      },
      () => {
        this.errorMessage = 'Error updating event';
        this.isLoading = false;
      },
    );
  }
}
