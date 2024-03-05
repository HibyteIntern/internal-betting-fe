import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bet } from '../entity/Bet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  private betUrl = 'http://localhost:8080/api/v1/bets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Set<Bet>> {
    return this.http.get<Set<Bet>>(`${this.betUrl}`);
  }

  getBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${this.betUrl}/user`);
  }

  getOne(betId: number): Observable<Bet> {
    return this.http.get<Bet>(`${this.betUrl}/${betId}`);
  }

  create(betDto: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.betUrl, betDto);
  }

  createMany(betsDto: Bet[]): Observable<Bet[]> {
    return this.http.post<Bet[]>(`${this.betUrl}/many`, betsDto);
  }

  delete(betId: number): Observable<any> {
    return this.http.delete(`${this.betUrl}/${betId}`);
  }
}
