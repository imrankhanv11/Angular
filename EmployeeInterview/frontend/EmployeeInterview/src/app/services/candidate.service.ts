import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { privateEnpoints } from '../api/endPoints';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private baseUrl = 'https://localhost:7244/api';

  private http: HttpClient = inject(HttpClient);

  CandidateAdd(credentials: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${privateEnpoints.AddCandidate}`, credentials);
  }
}