import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { Event } from '../entity/event.model';

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

  addEvent(eventRequest: Event): Observable<Event> {
    return this.http.post<Event>(this.addUrl, eventRequest);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    const getUrl = `${this.apiUrl}/get/${eventId}`;
    return this.http.get<Event>(getUrl);
  }

  updateEvent(eventId: string, eventRequest: Event): Observable<Event> {
    const updateUrl = `${this.apiUrl}/edit/${eventId}`;
    return this.http.put<Event>(updateUrl, eventRequest);
  }

  deleteEvent(eventId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/${eventId}`;
    return this.http.delete(deleteUrl);
  }

  getAllTags(): Observable<string[]> {
    return this.http.get<string[]>(this.getEventsUrl + '/get/tags');
  }

  getEventsSearch(query: string): Observable<Event[]> {
    this.loadingSubject.next(true);

    return this.http
      .get<Event[]>(`${this.getEventsUrl}/get/name`, {
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
