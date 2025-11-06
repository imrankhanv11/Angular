// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';
// import { BookType } from '../types/bookType';
// import { HttpErrorResponse } from '@angular/common/http';
// import { apiErrorHandler } from '../api/apiErrorHandler';
// import { enpoints } from '../api/endPoints';
// import { getDefaultHeaders, BASE_URL } from '../api/api';

// @Injectable({
//     providedIn: 'root'
// })
// export class BookService {
//     constructor(private http: HttpClient) { }

//     getBooks(): Observable<BookType[]> {
//         const url = `${BASE_URL}${enpoints.GETALLBOOKS}`;
//         const headers = getDefaultHeaders();

//         return this.http.get<BookType[]>(url, { headers }).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 const formattedError = apiErrorHandler(error);
//                 return throwError(() => formattedError);
//             })
//         );
//     }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BookType } from '../types/bookType';
import { enpoints } from '../api/endPoints';
import { getDefaultHeaders, BASE_URL } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class BookService {


  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookType[]> {
    const url = `${BASE_URL}${enpoints.GETALLBOOKS}`;
    const headers = getDefaultHeaders();

    return this.http.get<BookType[]>(url, { headers })
  }
}
