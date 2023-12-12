import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  constructor(private http: HttpClient) {}

  getSample() {
    return this.http.get(`${environment.baseUrl}/sample`, {
      responseType: 'text',
    });
  }
}
