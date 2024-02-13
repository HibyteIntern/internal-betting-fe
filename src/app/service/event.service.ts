import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { EventRequest } from '../entity/EventRequest';
import {UserProfile} from "../entity/user-profile";

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/v1/events'; // Adjust the base URL as needed
  private addUrl = 'http://localhost:8080/api/v1/events/add';
  private getEventsUrl = 'http://localhost:8080/api/v1/events'; // Adjust the URL as needed

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  addEvent(eventRequest: EventRequest): Observable<any> {
    return this.http.post(this.addUrl, eventRequest);
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
    return this.http.get<UserProfile[]>(
      'http://localhost:8080/api/user-profiles',
    );
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(this.getEventsUrl + '/get/tags');
  }

  getEventsSearch(query: string): Observable<EventRequest[]> {
    this.loadingSubject.next(true);

    return this.http
      .get<EventRequest[]>(`${this.getEventsUrl}/get/name`, {
        params: new HttpParams().set('name', query),
      })
      .pipe(
        catchError((error) => {
          console.log('Competitions Search API Error:', error);
          throw error;
        }),
        finalize(() => this.loadingSubject.next(false)),
      );
  }
}
