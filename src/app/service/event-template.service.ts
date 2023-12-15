import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EventTemplate} from "../entity/EventTemplate";
import EntityState from "../entity/EntityState";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {multipleChoiceOptionValidator} from "../shared/validator/multiple-choice-option.validator";
import {multipleChoiceValidator} from "../shared/validator/multiple-choice.validator";
import {BetTemplate} from "../entity/BetTemplate";

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

  constructor(private _http: HttpClient,
              private reactiveFormBuilder: FormBuilder,
  ) {
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

  get(id: number): Observable<EventTemplate> {
    return this._http.get<EventTemplate>(this.apiUrl + "/" + id)
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

  updateEventTemplate(id: number, eventTemplate: EventTemplate): Observable<boolean> {
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);
    return this._http.put<EventTemplate>(this.apiUrl + "/" + id, eventTemplate).pipe(
      map((response) => {
        this.data.entity = this.data.entity.map((eventTemplate) => {
          if(eventTemplate.id === id) {
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
        this.data.error = "Error while updating event template";
        this.eventTemplateSubject.next(this.data);
        return of(false);
      }),
    );
  }
  deleteEventTemplate(id: number) {
    this.data.loading = true;
    this.data.error = null;
    this.eventTemplateSubject.next(this.data);
    this._http.delete(this.apiUrl + "/" + id).subscribe(() => {
      this.data.entity = this.data.entity.filter((eventTemplate) => eventTemplate.id !== id);
      this.data.loading = false;
      this.eventTemplateSubject.next(this.data);
    });
  }

  prepopulateEventTemplateForm(eventTemplate: EventTemplate, formGroup: FormGroup) {
    formGroup.patchValue({
      name: eventTemplate.name
    })
    let betTemplates = formGroup.get('betTemplates') as FormArray;
    eventTemplate.betTemplates.forEach((betTemplate) => {
        betTemplates.push(this.createBetTemplateForm(betTemplate));
    });
  }

  private createBetTemplateForm(betTemplate: BetTemplate): FormGroup {
    return this.reactiveFormBuilder.group({
      name: [betTemplate.name, [Validators.required, Validators.maxLength(50)]],
      type: [betTemplate.type, Validators.required],
      multipleChoiceOptions: this.createMultipleChoiceOptionForm(betTemplate)
    }, { validators: multipleChoiceValidator()});
  }

  private createMultipleChoiceOptionForm(betTemplate: BetTemplate): FormArray {
    let multipleChoiceOptions = this.reactiveFormBuilder.array([]);
    if(betTemplate.type === 'MULTIPLE_CHOICE' && betTemplate.multipleChoiceOptions) {
      betTemplate.multipleChoiceOptions.forEach((option) => {
        multipleChoiceOptions.push(this.reactiveFormBuilder.control(option, multipleChoiceOptionValidator()));
      });
    } else {
      multipleChoiceOptions.push(this.reactiveFormBuilder.control("", multipleChoiceOptionValidator()));
      multipleChoiceOptions.push(this.reactiveFormBuilder.control("", multipleChoiceOptionValidator()));
    }
    return multipleChoiceOptions;
  }
}
