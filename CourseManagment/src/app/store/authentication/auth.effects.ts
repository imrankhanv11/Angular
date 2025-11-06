import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFaild } from './auth.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginStart),
            mergeMap(({ email, password }) =>

                this.authService.login({ email, password }).pipe(
                    map((res: any) =>
                        loginSuccess({
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken,
                            expiresAt: res.expiresAt,
                            isAuthenticated: true
                        })
                    ),
                    catchError((error) => {
                        const errorMessage =
                            error?.error?.message || 'Something went wrong. Please try again.';

                        return of(loginFailure({ error: errorMessage }));
                    })
                )
            )
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerStart),
            mergeMap(({ name, email, password }) =>
                this.authService.register({ name, email, password }).pipe(
                    map((res: any) =>
                        registerSuccess({ status: true })
                    ),
                    catchError((error) => {
                        const errorMessage =
                            error?.error?.message || 'Something went wrong. Please try again.';

                        return of(registerFaild({ error: errorMessage }));
                    })
                )
            )
        )
    );
}
