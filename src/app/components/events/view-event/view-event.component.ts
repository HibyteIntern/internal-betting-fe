import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventRequest } from '../../../entity/EventRequest';
import { Status } from '../../../entity/Status';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {
  eventRequest!: EventRequest ;
  eventId!:string;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];

      this.fetchEventData();
    });

    this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];

      this.fetchEventData();
    });
  }
  fetchEventData() {
    this.http.get(`http://localhost:8080/api/v1/events/get/${this.eventId}`).subscribe(
      (data: any) => {
        this.eventRequest = new EventRequest(data);
      },
      (error) => {
        console.error('Error fetching event data:', error);
      }
    );
  }
  navigateToEditEvent() {
    this.router.navigate(['/edit-event', this.eventId]);
  }
}
