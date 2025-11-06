import { createReducer, on } from '@ngrx/store';
import {
    addUser, addUserSuccess,
    addUserFailure, loadUsersSuccess,
    deleteUser, deleteUserFailure,
    deleteUserSuccess, updateUser,
    updateUserFailure, updateUserSuccess,
    selectUserForEdit, clearSelectedUser,
    loadUsers,
    loadUsersFailure
} from './user.action';
import { UserList } from '../../common/types/userList';

export interface UserState {
    // get
    users: UserList[];
    loading: boolean;
    error: string | null;

    // add
    addUserSuccess: boolean | null;
    addUserError: string | null;

    // delete
    deleteUserSuccess: boolean;
    deleteUserError: string | null;

    // update
    updateUserSuccess: boolean;
    updateUserError: string | null;

    // edit
    selectedUser: UserList | null;
}

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null,

    addUserSuccess: null,
    addUserError: null,

    deleteUserSuccess: false,
    deleteUserError: null,

    updateUserSuccess: false,
    updateUserError: null,

    selectedUser: null,
};

export const userReducer = createReducer(
    initialState,

    // add
    on(addUser, (state) => ({
        ...state,
        loading: true,
        addUserSuccess: null,
        addUserError: null,
    })),

    on(addUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        users: [...state.users, user],
        addUserSuccess: true,
        addUserError: null,
    })),

    on(addUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        addUserSuccess: false,
        addUserError: error,
    })),

    // get
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
    })),


    on(loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),


    on(loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // delete
    on(deleteUser, (state) => ({
        ...state,
        deleteUserSuccess: false,
        deleteUserError: null
    })),

    on(deleteUserSuccess, (state, { userId }) => ({
        ...state,
        loading: false,
        users: state.users.filter(user => user.id !== userId),
        deleteUserSuccess: true
    })),

    on(deleteUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        deleteUserError: error
    })),

    // update
    on(updateUser, (state) => ({
        ...state,
        loading: true,
        updateUserError: state.error
    })),

    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map((u) =>
            u.id === user.id
                ? {
                    ...u,
                    ...user,
                } as UserList
                : u
        ),
        updateUserSuccess: true,
        loading: false,
    })),

    on(updateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        updateUserError: error,
    })),

    // edit
    on(selectUserForEdit, (state, { user }) => ({
        ...state,
        selectedUser: user
    })),

    on(clearSelectedUser, (state) => ({
        ...state,
        selectedUser: null
    }))
);
