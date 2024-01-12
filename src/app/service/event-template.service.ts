import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventTemplate } from '../entity/event-template.model';

@Injectable({
  providedIn: 'root',
})
export class EventTemplateService {
  private apiUrl: string = environment.baseUrl + '/v1/event-templates';
  eventTemplateSubject = new BehaviorSubject<EventTemplate[]>([]);

  constructor(private http: HttpClient) {
    this.fetch();
  }

  getData(): Observable<EventTemplate[]> {
    return this.eventTemplateSubject.asObservable();
  }

  fetch(name?: string) {
    let apiPath = this.apiUrl;
    if(name) apiPath = this.apiUrl + `?name=${name}`;
    this.http
      .get<EventTemplate[]>(apiPath)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            //in the future you will probably be redirected using an auth guard, but for now this is here
          }
          return [];
        }),
      )
      .subscribe((eventTemplates) => {
        this.eventTemplateSubject.next(eventTemplates);
      });
  }

  getById(id: number): Observable<EventTemplate> {
    return this.http.get<EventTemplate>(this.apiUrl + '/' + id);
  }

  add(newEventTemplate: EventTemplate): Observable<boolean> {
    return this.http.post<EventTemplate>(this.apiUrl, newEventTemplate).pipe(
      map((response) => {
        const newList: EventTemplate[] = this.eventTemplateSubject.getValue();
        newList.push(response);
        this.eventTemplateSubject.next(newList);
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }

  update(id: number, eventTemplate: EventTemplate): Observable<boolean> {
    return this.http
      .put<EventTemplate>(this.apiUrl + '/' + id, eventTemplate)
      .pipe(
        map((response) => {
          let updatedList = this.eventTemplateSubject.getValue();
          updatedList = updatedList.map((eventTemplate) => {
            if (eventTemplate.id === id) {
              return response;
            }
            return eventTemplate;
          });
          this.eventTemplateSubject.next(updatedList);
          return true;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  delete(id: number) {
    this.http.delete(this.apiUrl + '/' + id).subscribe(() => {
      let updatedList: EventTemplate[] = this.eventTemplateSubject.getValue();
      updatedList = updatedList.filter(
        (eventTemplate) => eventTemplate.id !== id,
      );
      this.eventTemplateSubject.next(updatedList);
    });
  }
}
