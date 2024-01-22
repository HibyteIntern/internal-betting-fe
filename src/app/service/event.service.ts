import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize } from 'rxjs';
import { EventRequest } from '../entity/EventRequest';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private addUrl = 'http://localhost:8080/api/v1/events/add';
  private getEventsUrl = 'http://localhost:8080/api/v1/events'; // Adjust the URL as needed

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

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
