import { Injectable } from '@angular/core';
import { PrizeDraw } from '../entity/prize-draw.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import PrizeDrawRequest from '../entity/prize-draw-request.model';

@Injectable({
  providedIn: 'root',
})
export class PrizeDrawService {
  private apiUrl: string = environment.baseUrl + '/v1/prize-draws';
  prizeDrawSubject = new BehaviorSubject<PrizeDraw[]>([]);
  constructor(private http: HttpClient) {
    this.fetchActive();
  }

  getData() {
    return this.prizeDrawSubject.asObservable();
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
    this.fetch(this.apiUrl + '/active');
  }

  fetchPast() {
    this.fetch(this.apiUrl + '/past');
  }

  getById(id: number) {
    return this.http.get<PrizeDraw>(this.apiUrl + '/' + id);
  }

  add(prizeDrawRequest: PrizeDrawRequest): Observable<boolean> {
    return this.http.post<PrizeDraw>(this.apiUrl, prizeDrawRequest).pipe(
      map((response) => {
        const newList: PrizeDraw[] = this.prizeDrawSubject.getValue();
        newList.push(response);
        this.prizeDrawSubject.next(newList);
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }

  getTimeRemaining(targetDate: Date | undefined): string {
    if (!targetDate) {
      return '';
    }
    const now = new Date();
    const endsAt = new Date(targetDate);
    const diff = endsAt.getTime() - now.getTime();

    if (diff < 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (hours < 1) {
      return `${minutes} minutes`;
    }
    return (
      `${days} ` +
      (days === 1 ? 'day' : 'days') +
      ` ${hours % 24} ` +
      ((hours % 24) === 1 ? 'hour' : 'hours')
    );
  }
}
