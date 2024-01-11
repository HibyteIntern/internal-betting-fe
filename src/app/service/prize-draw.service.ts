import { Injectable } from '@angular/core';
import { PrizeDraw } from "../entity/PrizeDraw";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrizeDrawService {

  private apiUrl: string = environment.baseUrl + '/v1/prize-draws';
  prizeDrawSubject = new BehaviorSubject<PrizeDraw[]>([]);
  constructor(private http: HttpClient) {
    this.fetchActive()
  }

  getData() {
    return this.prizeDrawSubject.asObservable()
  }

  fetch(apiUrl: string) {
    this.http
      .get<PrizeDraw[]>(apiUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            //will probably be handled by a guard in the future
          }
          return [];
        }),
      )
      .subscribe((prizeDraws) => {
        this.prizeDrawSubject.next(prizeDraws);
      });
  }

  fetchActive() {
    this.fetch(this.apiUrl + "/active")
  }

  fetchPast() {
    this.fetch(this.apiUrl + "/past")
  }

  getById(id: number) {
    return this.http.get<PrizeDraw>(this.apiUrl + '/' + id);
  }
}
