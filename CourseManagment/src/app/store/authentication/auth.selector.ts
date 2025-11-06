import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Login
export const selectAccessToken = createSelector(
    selectAuthState,
    (state) => state.accessToken
);

export const selectRefreshToken = createSelector(
    selectAuthState,
    (state) => state.refreshToken
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state) => state.loading
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
);


// Register
export const selectRegisterSuccess = createSelector(
    selectAuthState,
    (state) => state.registerSuccess
)

export const selectRegisterFaild = createSelector(
    selectAuthState,
    (state) => state.registerError
)