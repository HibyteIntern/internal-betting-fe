import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { EventRequest } from '../entity/EventRequest';
import { UserProfile } from '../entity/UserProfile';
import { Bet } from '../entity/Bet';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/v1/events';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  addEvent(eventRequest: EventRequest): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/v1/events/add',
      eventRequest,
    );
  }

  addBetToEvent(bet: Bet): Observable<any> {
    return this.http.post(`http://localhost:8080/api/v1/bets`, bet);
  }

  getEvents(): Observable<EventRequest[]> {
    return this.http.get<EventRequest[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<EventRequest> {
    return this.http.get<EventRequest>(`${this.apiUrl}/get/${eventId}`);
  }

  updateEvent(eventId: string, eventRequest: EventRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${eventId}`, eventRequest);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${eventId}`);
  }

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(
      'http://localhost:8080/api/v1/user-profile',
    );
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/get/tags`);
  }

  getEventsSearch(query: string): Observable<EventRequest[]> {
    this.loadingSubject.next(true);

    return this.http
      .get<EventRequest[]>(`${this.apiUrl}/get/name`, {
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
