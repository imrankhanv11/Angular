import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, loginStart, loginFailure } from './auth.actions';

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const storedAuth = localStorage.getItem('authState');

const initialState: AuthState = storedAuth
    ? {
        ...JSON.parse(storedAuth),
        loading: false,
        error: null,
    }
    : {
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    };

export const authReducer = createReducer(
    initialState,

    // Login
    on(loginStart, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loginSuccess, (state, action) => ({
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isAuthenticated: action.isAuthenticated,
        loading: false,
        error: null,
    })),

    on(loginFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error || 'Login failed reducer'
    })),

    // logout
    on(logout, () => {
        return {
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }),
);
