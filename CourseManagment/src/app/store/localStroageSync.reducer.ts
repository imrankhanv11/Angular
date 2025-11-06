import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AuthState } from './authentication/auth.reducer';

export interface AppState {
    auth: AuthState;
}

export function localStorageSyncReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const storageValue = localStorage.getItem('authState');
            if (storageValue) {
                try {
                    const savedAuth = JSON.parse(storageValue) as Partial<AuthState>;
                    const mergedAuth: AuthState = {
                        ...state?.auth,
                        ...savedAuth,
                        accessToken: savedAuth.accessToken ?? state?.auth?.accessToken ?? null,
                        refreshToken: savedAuth.refreshToken ?? state?.auth?.refreshToken ?? null,
                        expiresAt: savedAuth.expiresAt ?? state?.auth?.expiresAt ?? null,
                        isAuthenticated: !!savedAuth.accessToken,
                        loading: false,
                        error: null,
                    };

                    return {
                        ...state,
                        auth: mergedAuth,
                    };
                } catch {
                    localStorage.removeItem('authState');
                }
            }
        }

        const nextState = reducer(state, action);

        if (nextState?.auth) {
            const { accessToken, refreshToken, expiresAt, isAuthenticated } = nextState.auth;
            localStorage.setItem(
                'authState',
                JSON.stringify({ accessToken, refreshToken, expiresAt, isAuthenticated })
            );
        }

        return nextState;
    };
}
