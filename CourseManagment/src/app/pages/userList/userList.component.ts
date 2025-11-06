import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable, take, tap } from "rxjs";
import { UserRowComponent } from "../../common/components/userRow/userRow.component";
import { UserList } from "../../common/types/userList";
import { loadUsers } from "../../store/user/user.action";
import {
    selectAllUsers,
    selectUserLoading,
    selectUserError,
} from "../../store/user/user.selector";
import { inject } from "@angular/core";

@Component({
    selector: "app-userlist",
    standalone: true,
    imports: [CommonModule, UserRowComponent],
    templateUrl: "userList.component.html",
    styleUrls: ["userList.component.css"],
})
export class UserListComponent implements OnInit {
    users$!: Observable<UserList[]>;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    private store: Store = inject(Store);

    ngOnInit(): void {
        this.users$ = this.store.select(selectAllUsers);

        this.users$
            .pipe(
                take(1), 
                tap(users => {
                    if (!users || users.length === 0) {
                        this.store.dispatch(loadUsers());
                    }
                })
            )
            .subscribe();

        this.loading$ = this.store.select(selectUserLoading);
        this.error$ = this.store.select(selectUserError);
    }
}