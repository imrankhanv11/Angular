import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { privateEnpoints } from '../api/endPoints';
import { UserAddDto } from '../common/types/userAddDTO';
import { UserList } from '../common/types/userList';
import { UserUpdateDate } from '../common/types/userUpdateDTO';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://localhost:5173/api';

    private http: HttpClient = inject(HttpClient);

    getUsers(): Observable<UserList[]> {
        return this.http.get<UserList[]>(`${this.baseUrl}${privateEnpoints.GetUser}`);
    }

    addUser(user: UserAddDto): Observable<UserList> {
        return this.http.post<UserList>(`${this.baseUrl}${privateEnpoints.AddUser}`, user);
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}${privateEnpoints.DeleteUser(userId)}`);
    }

    updateUser(user: UserUpdateDate) {
        return this.http.put<UserList>(`${this.baseUrl}${privateEnpoints.UpdateUser}`, user);
    }
}