import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventTemplate } from '../entity/EventTemplate';
import EntityState from '../entity/EntityState';

@Injectable({
  providedIn: 'root',
})
export class EventTemplateService {
  private data: EntityState<EventTemplate[]> = {
    entity: [],
    loading: false,
    error: null,
  };
  private apiUrl: string = environment.baseUrl + '/v1/event-templates';
  eventTemplateSubject = new BehaviorSubject<EntityState<EventTemplate[]>>(
    this.data,
  );

  constructor(private _http: HttpClient) {
    this.fetch();
  }

  getData(): Observable<EntityState<EventTemplate[]>> {
    return this.eventTemplateSubject.asObservable();
  }

  fetch(name?: string) {
    let apiPath = this.apiUrl;
    if(name) apiPath = this.apiUrl + `?name=${name}`;
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);

    this._http
      .get<EventTemplate[]>(apiPath)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401)
            this.data.error = 'Not authorized to view this content';
          else this.data.error = 'Something went wrong.';
          this.data.loading = false;
          return [];
        }),
      )
      .subscribe((eventTemplates) => {
        this.data.loading = false;
        this.data.entity = eventTemplates;
        this.eventTemplateSubject.next(this.data);
      });
  }

  getById(id: number): Observable<EventTemplate> {
    return this._http.get<EventTemplate>(this.apiUrl + '/' + id);
  }

  add(newEventTemplate: EventTemplate): Observable<boolean> {
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);
    return this._http.post<EventTemplate>(this.apiUrl, newEventTemplate).pipe(
      map((response) => {
        this.data.entity.push(response);
        this.data.loading = false;
        this.eventTemplateSubject.next(this.data);
        return true;
      }),
      catchError(() => {
        this.data.loading = false;
        this.data.error = 'Error while adding new event template';
        this.eventTemplateSubject.next(this.data);
        return of(false);
      }),
    );
  }

  update(id: number, eventTemplate: EventTemplate): Observable<boolean> {
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);
    return this._http
      .put<EventTemplate>(this.apiUrl + '/' + id, eventTemplate)
      .pipe(
        map((response) => {
          this.data.entity = this.data.entity.map((eventTemplate) => {
            if (eventTemplate.id === id) {
              return response;
            }
            return eventTemplate;
          });
          this.data.loading = false;
          this.eventTemplateSubject.next(this.data);
          return true;
        }),
        catchError(() => {
          this.data.loading = false;
          this.data.error = 'Error while updating event template';
          this.eventTemplateSubject.next(this.data);
          return of(false);
        }),
      );
  }

  delete(id: number) {
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);
    this._http.delete(this.apiUrl + '/' + id).subscribe(() => {
      this.data.entity = this.data.entity.filter(
        (eventTemplate) => eventTemplate.id !== id,
      );
      this.data.loading = false;
      this.eventTemplateSubject.next(this.data);
    });
  }
}
