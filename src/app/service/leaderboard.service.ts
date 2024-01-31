import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leaderboard } from '../entity/Leaderboard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private leaderboardUrl = 'http://localhost:8080/api/v1/leaderboards';

  constructor(private http: HttpClient){}

  getLeaderboard(leaderboardData: Leaderboard): Observable<Leaderboard> {
    let params = new HttpParams();
    if (leaderboardData.startDate) {
      params = params.set('startDate', leaderboardData.startDate.toISOString());
    }
    if (leaderboardData.endDate) {
      params = params.set('endDate', leaderboardData.endDate.toISOString());
    }
    if (leaderboardData.usersInLeaderboard) {
      leaderboardData.usersInLeaderboard.forEach((userId, index) => {
        params = params.append('users', userId);
      });
    }
    return this.http.get<Leaderboard>(`${this.leaderboardUrl}/get`, { params });
  }
}
