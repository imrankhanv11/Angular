import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginResponseType } from '../common/types/loginResponseType';
import { publicEnpoints } from '../api/endPoints';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:5173/api';

    private http: HttpClient = inject(HttpClient);

    login(credentials: { email: string; password: string }): Observable<loginResponseType> {
        return this.http.post<loginResponseType>(`${this.baseUrl}${publicEnpoints.Login}`, credentials);
    }

    refreshToken(payload: { refreshToken: string }) {
        return this.http.post(`${this.baseUrl}${publicEnpoints.Refresh}`, payload);
    }

    register(data: { name: string, email: string, password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}${publicEnpoints.Register}`, data);
    }
}
