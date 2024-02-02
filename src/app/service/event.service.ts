import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventRequest } from '../entity/EventRequest';
import {UserProfile} from "../entity/UserProfile";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/v1/events'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  addEvent(eventRequest: EventRequest): Observable<any> {
    const addUrl = `${this.apiUrl}/add`;
    return this.http.post(addUrl, eventRequest);
  }

  getEvents(): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<EventRequest> {
    const getUrl = `${this.apiUrl}/get/${eventId}`;
    return this.http.get<EventRequest>(getUrl);
  }

  updateEvent(eventId: string, eventRequest: EventRequest): Observable<any> {
    const updateUrl = `${this.apiUrl}/edit/${eventId}`;
    return this.http.put(updateUrl, eventRequest);
  }

  deleteEvent(eventId: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/${eventId}`;
    return this.http.delete(deleteUrl);
  }

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>('http://localhost:8080/api/user-profiles');
  }
}
