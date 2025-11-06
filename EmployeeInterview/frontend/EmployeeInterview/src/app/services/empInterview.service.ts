import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { privateEnpoints } from '../api/endPoints';
import { empInterviewType } from '../common/type/empInterviewRespons';
import { EmployeeMarkRequest } from '../common/type/empInveriewMarkRequest';

@Injectable({
    providedIn: 'root',
})
export class EmployeeInterviewService {
    private baseUrl = 'https://localhost:7244/api';
    private http: HttpClient = inject(HttpClient);

    interviews = signal<empInterviewType[]>([]);

    getAllEmpInterview(): Observable<empInterviewType[]> {
        return this.http.get<empInterviewType[]>(`${this.baseUrl}${privateEnpoints.EmpInterviewGet}`)
            .pipe(
                tap((response) => {
                    this.interviews.set(response);
                })
            )
    };

    evaluvateInterview(data: EmployeeMarkRequest): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}${privateEnpoints.EmpInterviewMarks}`, data)
            .pipe(
                tap(() => {
                    this.interviews.set(
                        this.interviews().filter(s => s.id !== data.id)
                    );
                })
            );
    }
}