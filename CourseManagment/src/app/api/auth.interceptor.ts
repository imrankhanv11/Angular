import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { publicEnpoints } from './endPoints';
import { logout, loginSuccess } from '../store/authentication/auth.actions';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store);
    const authService = inject(AuthService);

    const publicEndpointsList = Object.values(publicEnpoints);
    const isPublicEndpoint = publicEndpointsList.some(endpoint =>
        req.url.includes(endpoint)
    );

    if (isPublicEndpoint) return next(req);

    let token: string | null = null;
    store.select((state: any) => state.auth?.accessToken)
        .pipe(take(1))
        .subscribe(t => token = t);

    let clonedReq = req;
    if (token) {
        clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(clonedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status !== 401) {
                return throwError(() => error);
            }

            let refreshToken: string | null = null;
            store.select((state: any) => state.auth?.refreshToken)
                .pipe(take(1))
                .subscribe(rt => refreshToken = rt);

            if (!refreshToken) {
                store.dispatch(logout());
                return throwError(() => error);
            }

            return authService.refreshToken({ refreshToken }).pipe(
                switchMap((response: any) => {
                    store.dispatch(loginSuccess({
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                        expiresAt: response.expiresAt,
                        isAuthenticated: true
                    }));

                    const retryReq = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${response.accessToken}`
                        }
                    });
                    return next(retryReq).pipe(
                        catchError(err => {
                            if (err.status === 401) {
                                store.dispatch(logout());
                            }
                            return throwError(() => err);
                        })
                    );
                }),
                catchError(refreshError => {
                    if (refreshError.status === 401) {
                        store.dispatch(logout());
                    }
                    return throwError(() => refreshError);
                })
            );
        })
    );
};
