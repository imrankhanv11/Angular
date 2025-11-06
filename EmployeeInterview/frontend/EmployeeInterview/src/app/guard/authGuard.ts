import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAuthenticated } from '../store/authentication/auth.selector';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.select(selectIsAuthenticated).pipe(
        map((isAuth) => {
            if (isAuth) {
                return true;
            } else {
                router.navigate(['/']);
                return false;
            }
        })
    );
};
