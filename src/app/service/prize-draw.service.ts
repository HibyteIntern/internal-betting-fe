import { Injectable } from '@angular/core';
import { PrizeDraw } from '../entity/prize-draw.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import PrizeDrawRequest from '../entity/prize-draw-request.model';
import { PrizeDrawEntry } from '../entity/prize-draw-entry.model';
import PrizeDrawEntryRequest from '../entity/prize-draw-entry-request.model';

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

  delete(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id).pipe(
      map(() => {
        const newList: PrizeDraw[] = this.prizeDrawSubject.getValue();
        const index = newList.findIndex((prizeDraw) => prizeDraw.id === id);
        if (index > -1) {
          newList.splice(index, 1);
          this.prizeDrawSubject.next(newList);
        }
        return true;
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }

  update(id: number, prizeDrawRequest: PrizeDrawRequest): Observable<boolean> {
    return this.http
      .put<PrizeDraw>(this.apiUrl + '/' + id, prizeDrawRequest)
      .pipe(
        map((response) => {
          let updatedList = this.prizeDrawSubject.getValue();
          updatedList = updatedList.map((prizeDraw) => {
            if (prizeDraw.id === id) {
              return response;
            }
            return prizeDraw;
          });
          this.prizeDrawSubject.next(updatedList);
          return true;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }

  addEntryToDraw(
    prizeDrawEntryRequest: PrizeDrawEntryRequest,
  ): Observable<PrizeDrawEntry> {
    return this.http.post<PrizeDrawEntry>(
      this.apiUrl + '/entry',
      prizeDrawEntryRequest,
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
      (hours % 24 === 1 ? 'hour' : 'hours')
    );
  }
}
