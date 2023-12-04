import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Competition from '../models/competition.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(
    private http: HttpClient
  ) { }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${environment.baseUrl}/competitions`, { responseType: 'json'});
  }

  getCompetition(id: number): Observable<Competition> {
    return this.http.get<Competition>(`${environment.baseUrl}/competitions/${id}`, { responseType: 'json'});
  }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(`${environment.baseUrl}/competitions`,  competition, { responseType: 'json'});
  }

  updateCompetition(competition: Competition): Observable<Competition> {
    return this.http.put<Competition>(`${environment.baseUrl}/competitions/${competition.id}`,  competition, { responseType: 'json'});
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/competitions/${id}`);
  }
}
