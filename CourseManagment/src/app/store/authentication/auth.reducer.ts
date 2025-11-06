import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, loginStart, loginFailure, registerSuccess, registerStart, registerFaild } from './auth.actions';

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;

    registerSuccess: boolean;
    registerError: string | null;

}

const storedAuth = localStorage.getItem('authState');

const initialState: AuthState = storedAuth
    ? {
        ...JSON.parse(storedAuth),
        loading: false,
        error: null,
        registerError: null,
        registerSuccess: false,
    }
    : {
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        registerError: null,
        registerSuccess: false,
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
        expiresAt: action.expiresAt,
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
            expiresAt: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            registerError: null,
            registerSuccess: false
        };
    }),

    // --- REGISTER ---
    on(registerStart, (state) => ({
        ...state,
        loading: true,
        registerError: null,
        registerSuccess: false,
    })),

    on(registerSuccess, (state) => ({
        ...state,
        loading: false,
        registerSuccess: true,
        registerError: null,
    })),

    on(registerFaild, (state, action) => ({
        ...state,
        loading: false,
        registerError: action.error || 'Registration failed',
        registerSuccess: false,
    })),
);
