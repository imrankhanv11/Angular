import { createAction, props } from '@ngrx/store';

// Login
export const loginStart = createAction(
    '[Auth] Login Start',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ accessToken: string; refreshToken: string; expiresAt: string, isAuthenticated: boolean }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');


// Register
export const registerStart = createAction(
    '[Auth] register start',
    props<{ name: string, email: string, password: string }>()
);

export const registerSuccess = createAction(
    '[Auth] register Success',
    props<{ status: boolean }>()
);

export const registerFaild = createAction(
    '[Auth] register Failed',
    props<{ error: any }>()
)