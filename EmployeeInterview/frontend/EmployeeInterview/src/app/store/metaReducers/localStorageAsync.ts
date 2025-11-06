import { ActionReducer, INIT, UPDATE, MetaReducer } from '@ngrx/store';
import { AuthState } from '../authentication/auth.reducer';

export interface AppState {
    authStore: AuthState;
}

export function localStorageSyncReducer(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    return (state, action) => {
        if (action.type === INIT || action.type === UPDATE) {
            const saved = localStorage.getItem('authState');
            if (saved) {
                try {
                    const authData: AuthState = JSON.parse(saved);
                    return {
                        ...state,
                        authStore: {
                            ...state?.authStore,
                            ...authData,
                            isAuthenticated: !!authData.accessToken,
                            loading: false,
                            error: null,
                        },
                    };
                } catch {
                    localStorage.removeItem('authState');
                }
            }
        }

        const nextState = reducer(state, action);

        if (nextState?.authStore) {
            const { accessToken, refreshToken, isAuthenticated } = nextState.authStore;
            localStorage.setItem(
                'authState',
                JSON.stringify({ accessToken, refreshToken, isAuthenticated })
            );
        }

        return nextState;
    };
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
