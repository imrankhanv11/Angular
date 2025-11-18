import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { privateEnpoints } from '../api/endPoints';
import { courseList } from '../common/types/courseList';
import { CourseAdd } from '../common/types/courseAdd';
import { CourseUpdate } from '../common/types/courseUpdate';

@Injectable({ providedIn: 'root' })
export class CourseService {
    private baseUrl = 'http://localhost:5173/api';

    private http: HttpClient = inject(HttpClient);

    getCouses(): Observable<courseList[]> {
        return this.http.get<courseList[]>(`${this.baseUrl}${privateEnpoints.GetCourse}`);
    }

    addCourse(data: CourseAdd): Observable<courseList> {
        return this.http.post<courseList>(`${this.baseUrl}${privateEnpoints.AddCourse}`, data);
    }

    deletCourse(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}${privateEnpoints.DeleteCourse(id)}`);
    }

    UpdateCourse(data: CourseUpdate): Observable<courseList> {
        return this.http.put<courseList>(`${this.baseUrl}${privateEnpoints.UpdateCourse}`, data);
    }
}