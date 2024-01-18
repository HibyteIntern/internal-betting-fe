import { Component } from '@angular/core';
import {EventRequest} from "../../../entity/EventRequest";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent {
  eventId!: string;
  formData: EventRequest = new EventRequest();
  eventTemplates: any[] = [];
  statusOptions: string[] = ['DRAFT', 'PUBLISHED', 'CANCELLED'];

  constructor(private route: ActivatedRoute,private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];

      this.http
        .get(`http://localhost:8080/api/v1/events/get/${this.eventId}`)
        .subscribe(
          (data: any) => {
            this.formData = new EventRequest(data);
          },
          (error) => {
            console.error('Error fetching event data:', error);
          }
        );
    });
  }

  submitForm() {
    this.http
      .put(`http://localhost:8080/api/v1/events/edit/${this.eventId}`, this.formData)
      .subscribe(
        (response) => {
          console.log('Event updated successfully:', response);
          // You may want to navigate to a different page or handle success accordingly
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
     this.router.navigate(['/view-event', this.eventId]);
  }
}
