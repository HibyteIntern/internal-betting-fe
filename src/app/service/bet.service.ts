import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompleteBet } from '../entity/complete-bet.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BetService {
  private betUrl = 'http://localhost:8080/api/v1/bets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Set<CompleteBet>> {
    return this.http.get<Set<CompleteBet>>(`${this.betUrl}`);
  }

  getBets(): Observable<CompleteBet[]> {
    return this.http.get<CompleteBet[]>(`${this.betUrl}/user`);
  }

  getOne(betId: number): Observable<CompleteBet> {
    return this.http.get<CompleteBet>(`${this.betUrl}/${betId}`);
  }

  create(betDto: CompleteBet): Observable<CompleteBet> {
    return this.http.post<CompleteBet>(this.betUrl, betDto);
  }

  createMany(betsDto: CompleteBet[]): Observable<CompleteBet[]> {
    return this.http.post<CompleteBet[]>(`${this.betUrl}/many`, betsDto);
  }

  delete(betId: number): Observable<any> {
    return this.http.delete(`${this.betUrl}/${betId}`);
  }
}
