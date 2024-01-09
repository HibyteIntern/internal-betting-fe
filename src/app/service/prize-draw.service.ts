import { Injectable } from '@angular/core';
import {PrizeDraw} from "../entity/PrizeDraw";
import EntityState from "../entity/EntityState";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrizeDrawService {

  private data: EntityState<PrizeDraw[]> = {
    entity: [],
    loading: false,
    error: null,
  };
  private apiUrl: string = environment.baseUrl + '/v1/prize-draws';
  prizeDrawSubject = new BehaviorSubject<EntityState<PrizeDraw[]>>(
    this.data,
  );
  constructor(private _http: HttpClient) {
    this.fetchActive()
  }

  getData() {
    return this.prizeDrawSubject.asObservable()
  }

  fetch(apiUrl: string) {
    this.data.loading = true;
    this.data.error = null;
    this.prizeDrawSubject.next(this.data);

    this._http
      .get<PrizeDraw[]>(apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401)
            this.data.error = 'Not authorized to view this content';
          else this.data.error = 'Something went wrong.';
          this.data.loading = false;
          return [];
        }),
      )
      .subscribe((prizeDraws) => {
        this.data.loading = false;
        this.data.entity = prizeDraws;
        this.prizeDrawSubject.next(this.data);
      });
  }

  fetchActive() {
    this.fetch(this.apiUrl + "/active")
  }

  fetchPast() {
    this.fetch(this.apiUrl + "/past")
  }
}
