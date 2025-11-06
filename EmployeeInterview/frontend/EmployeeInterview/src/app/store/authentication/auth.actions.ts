import { createAction, props } from '@ngrx/store';

// Login
export const loginStart = createAction(
    '[Auth] Login Start',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ accessToken: string; refreshToken: string; isAuthenticated: boolean }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');