import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leaderboard } from '../entity/Leaderboard';
import { Observable } from 'rxjs';
import { LeaderboardRequest } from '../entity/leaderboard-request';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  leaderboardUrl = 'http://localhost:8080/api/v1/leaderboards';

  constructor(private http: HttpClient) {}

  getLeaderboard(
    leaderboardRequest: LeaderboardRequest,
  ): Observable<Leaderboard> {
    return this.http.put<Leaderboard>(this.leaderboardUrl, leaderboardRequest);
  }
}
