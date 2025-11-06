import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, of } from 'rxjs';
import { selectIsAuthenticated, selectAccessToken } from '../store/authentication/auth.selector';
import { TokenService } from '../utils/token.service';

export const HRGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);
    const tokenService = inject(TokenService);

    return store.select(selectIsAuthenticated).pipe(
        switchMap((isAuth) => {
            if (!isAuth) {
                router.navigate(['/']);
                return of(false);
            }

            return store.select(selectAccessToken).pipe(
                map((token) => {
                    const role = tokenService.getRoleFromToken(token);

                    if (role === 'HR') {
                        return true;
                    } else {
                        router.navigate(['/unauthorized']);
                        return false;
                    }
                })
            );
        })
    );
};
