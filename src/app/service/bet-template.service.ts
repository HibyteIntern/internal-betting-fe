import { Injectable } from '@angular/core';
import {BetTemplate} from "../entity/BetTemplate";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BetTemplateService {

  private data: BetTemplate[] = []
  private apiUrl: string = environment.baseUrl + "/bet-templates";
  betTemplatesSubject = new Subject<BetTemplate[]>()

  constructor(private _http:HttpClient) {
    this.fetchBetTemplates();
  }

  getData(): Observable<BetTemplate[]> {
    return this.betTemplatesSubject.asObservable();
  }

  fetchBetTemplates() {
    this._http.get<BetTemplate[]>(this.apiUrl).subscribe((betTemplates) => {
      this.data = betTemplates;
      this.betTemplatesSubject.next(this.data);
    });
  }

  addBetTemplate(newBetTemplate: BetTemplate): Observable<boolean> {
    return this._http.post<BetTemplate>(this.apiUrl, newBetTemplate).pipe(
      map((response) => {
        this.data.push(response);
        this.betTemplatesSubject.next(this.data);
        return true;
      }),
      catchError(() => {
        return of(false)
      })
    );
  }
}
