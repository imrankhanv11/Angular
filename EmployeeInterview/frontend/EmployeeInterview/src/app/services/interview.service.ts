import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { privateEnpoints } from '../api/endPoints';
import { GetAllInterviewResponse } from '../common/type/interviewResponseType';

@Injectable({
    providedIn: 'root',
})
export class InterviewService {
    private baseUrl = 'https://localhost:7244/api';
    private http: HttpClient = inject(HttpClient);

    interviews = signal<GetAllInterviewResponse[]>([]);


    getAllInterview(): Observable<GetAllInterviewResponse[]> {
        return this.http.get<GetAllInterviewResponse[]>(`${this.baseUrl}${privateEnpoints.GetAllInterviewHR}`)
            .pipe(
                tap((response) => {
                    this.interviews.set(response);
                })
            )
    };

    assignInterview(data: { id: number; dateOfInterview: string; interviewerId: number }): Observable<any> {
        return this.http.patch(`${this.baseUrl}${privateEnpoints.AssignInterview}`, data)
            .pipe(
                tap((updatedInterview: any) => {
                    const currentInterviews = this.interviews();

                    const updatedList = currentInterviews.map(interview =>
                        interview.id === data.id
                            ? { ...interview, ...data, ...(updatedInterview || {}) } 
                            : interview
                    );

                    this.interviews.set([...updatedList]);
                })
            );
    }


}