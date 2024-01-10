import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventRequest } from '../entity/EventRequest';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private addUrl = 'http://localhost:8080/api/v1/events/add';
  private getEventsUrl = 'http://localhost:8080/api/v1/events'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  addEvent(eventRequest: EventRequest): Observable<any> {
    return this.http.post(this.addUrl, eventRequest);
  }

  getEvents(): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(this.getEventsUrl);
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(this.getEventsUrl + '/get/tags');
  }
}
