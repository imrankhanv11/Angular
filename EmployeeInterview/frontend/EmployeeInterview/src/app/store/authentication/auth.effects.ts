import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { loginStart, loginSuccess, loginFailure } from './auth.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loginResponseType } from '../../common/type/loginResponseType';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginStart),
            mergeMap(({ email, password }) =>

                this.authService.login({ email, password }).pipe(
                    map((res: loginResponseType) =>
                        loginSuccess({
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken,
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
}
