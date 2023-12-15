import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventTemplate} from "../entity/EventTemplate";
import EntityState from "../entity/EntityState";

@Injectable({
  providedIn: 'root'
})
export class EventTemplateService {

  private data: EntityState<EventTemplate[]> = {
    entity: [],
    loading: false,
    error: null
  };
  private apiUrl: string = environment.baseUrl + '/v1/event-templates';
  eventTemplateSubject = new BehaviorSubject<EntityState<EventTemplate[]>>(
    this.data,
  );

  constructor(private _http: HttpClient) {
    this.fetchEventTemplates();
  }

  getData(): Observable<EntityState<EventTemplate[]>> {
    return this.eventTemplateSubject.asObservable();
  }

  fetchEventTemplates() {
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);
    this._http.get<EventTemplate[]>(this.apiUrl).subscribe((eventTemplates) => {
      this.data.entity = eventTemplates;
      this.data.loading = false;
      this.eventTemplateSubject.next(this.data);
    });
  }

  addEventTemplate(newEventTemplate: EventTemplate): Observable<boolean> {
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
        this.data.error = "Error while adding new event template";
        this.eventTemplateSubject.next(this.data);
        return of(false);
      }),
    );
  }
}
