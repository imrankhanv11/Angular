import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {

    private actions$: Actions = inject(Actions);
    private userService: UserService = inject(UserService);

    // Get 
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((users) => UserActions.loadUsersSuccess({ users })),
                    catchError((error) =>
                        of(UserActions.loadUsersFailure({ error: error.message || 'Failed to load users' }))
                    )
                )
            )
        )
    );

    // Add
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addUser),
            mergeMap((action) =>
                this.userService.addUser(action.user).pipe(
                    map((user) => UserActions.addUserSuccess({ user })),
                    catchError((error) =>
                        of(UserActions.addUserFailure({ error: error?.error?.message || 'Failed to add user' }))
                    )
                )
            )
        )
    );

    // delete
    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap(({ userId }) =>
                this.userService.deleteUser(userId).pipe(
                    map(() => UserActions.deleteUserSuccess({ userId })),
                    catchError((error) =>
                        of(UserActions.deleteUserFailure({ error: error?.error?.message }))
                    )
                )
            )
        )
    );

    // update
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap(({ user }) =>
                this.userService.updateUser(user).pipe(
                    map((updatedUser) => UserActions.updateUserSuccess({ user: updatedUser })),
                    catchError((error) =>
                        of(UserActions.updateUserFailure({ error: error?.error?.message || 'Update failed' }))
                    )
                )
            )
        )
    );

}
