import { createAction, props } from '@ngrx/store';
import { UserList } from '../../common/types/userList';
import { UserAddDto } from '../../common/types/userAddDTO';
import { UserUpdateDate } from '../../common/types/userUpdateDTO';

// Get Users
export const loadUsers = createAction(
    '[User] Load Users'
);
export const loadUsersSuccess = createAction(
    '[User] Load Users Success',
    props<{ users: UserList[] }>()
);
export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: string }>()
);

// Add Users
export const addUser = createAction(
    '[User] Add User',
    props<{ user: UserAddDto }>()
);
export const addUserSuccess = createAction(
    '[User] Add User Success',
    props<{ user: UserList }>()
);
export const addUserFailure = createAction(
    '[User] Add User Failure',
    props<{ error: string }>()
);

// Delete User
export const deleteUser = createAction(
    '[User] Delete User',
    props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
    '[User] Delete User Success',
    props<{ userId: string }>()
);

export const deleteUserFailure = createAction(
    '[User] Delete User Failure',
    props<{ error: string }>()
);

// Update User
export const updateUser = createAction(
    '[User] Update User',
    props<{ user: UserUpdateDate }>()
);

export const updateUserSuccess = createAction(
    '[User] Update User Success',
    props<{ user: UserUpdateDate }>()
);

export const updateUserFailure = createAction(
    '[User] Update User Failure',
    props<{ error: string }>()
);

// Edit User
export const selectUserForEdit = createAction(
    '[User] Select User For Edit',
    props<{ user: UserList }>()
);

export const clearSelectedUser = createAction(
    '[User] Clear Selected User'
);