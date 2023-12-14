
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventRequest} from "../entity/EventRequest";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private addUrl = 'http://localhost:8080/api/v1/events/add';

  constructor(private http: HttpClient) {}

  addEvent(eventRequest: EventRequest): Observable<any> {
    return this.http.post(this.addUrl, eventRequest);
  }
}
