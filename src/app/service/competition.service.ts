import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Competition, CompetitionRequest } from "../entity/competitions.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, finalize, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CompetitionService {
    private apiUrl = environment.baseUrl + '/v2/competitions';

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor(private http: HttpClient) { }

    getCompetitions(): Observable<Competition[]> {
        this.loadingSubject.next(true);

        return this.http
            .get<Competition[]>(this.apiUrl)
            .pipe(
                catchError(error => {
                    console.log('Competitions API Error:', error);
                    throw error;
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }

    getCompetitionsSearch(query: string): Observable<Competition[]> {
        this.loadingSubject.next(true);

        return this.http
            .get<Competition[]>(`${this.apiUrl}`, { params: new HttpParams().set('name', query) })
            .pipe(
                catchError(error => {
                    console.log('Competitions Search API Error:', error);
                    throw error;
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }

    getCompetitionById(id: number): Observable<Competition> {
        this.loadingSubject.next(true);

        return this.http
            .get<Competition>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(error => {
                    console.log('Get competition by ID API Error:', error);
                    throw error;
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }

    addCompetition(competition: CompetitionRequest): Observable<Competition> {
        this.loadingSubject.next(true);

        return this.http
            .post<Competition>(this.apiUrl, competition)
            .pipe(
                catchError(error => {
                    console.log('Add Competition API Error:', error);
                    throw error;
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }

    updateCompetition(id: number, competition: CompetitionRequest): Observable<Competition> {
        this.loadingSubject.next(true);

        return this.http
            .put<Competition>(`${this.apiUrl}/${id}`, competition)
            .pipe(
                catchError(error => {
                    console.log('Update Competition API Error:', error);
                    throw error;
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }

    deleteCompetition(id: number) {
        this.loadingSubject.next(true);

        return this.http
            .delete(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(error => {
                    console.log('Delete Competition API Error:', error);
                    throw error;
                }),
                finalize(() => this.loadingSubject.next(false))
            );
    }
}
