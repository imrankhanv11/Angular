import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

// get
export const selectAllUsers = createSelector(
    selectUserState,
    (state) => state.users
);

export const selectUserLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectUserError = createSelector(
    selectUserState,
    (state) => state.error
);

// add
export const selectAddUserSuccess = createSelector(
    selectUserState,
    (state) => state.addUserSuccess
);

export const selectAddUserError = createSelector(
    selectUserState,
    (state) => state.addUserError
);

// delete
export const selectDeleteUserSuccess = createSelector(
    selectUserState,
    (state) => state.deleteUserSuccess
);

export const selectDeleteUserError = createSelector(
    selectUserState,
    (state) => state.deleteUserError
);

// edit
export const selectUsers = createSelector(
    selectUserState,
    (state) => state.selectedUser
);

// update
export const selectUpdateUserSuccess = createSelector(
    selectUserState,
    (state) => state.updateUserSuccess
);

export const selectUpdateUserError = createSelector(
    selectUserState,
    (state) => state.updateUserError
);