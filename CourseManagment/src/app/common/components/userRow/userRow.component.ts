import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserList } from '../../types/userList';
import { Store } from '@ngrx/store';
import { deleteUser, selectUserForEdit } from '../../../store/user/user.action';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'tr[app-user-row]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'userRow.component.html',
    styleUrls: ['userRow.component.css']
})
export class UserRowComponent {
    @Input() user!: UserList;
    @Input() index!: number;

    private store: Store = inject(Store);
    private router: Router = inject(Router);

    onDelete(): void {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete this User?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "No, Cancel",
            confirmButtonColor: "#198754",
            cancelButtonColor: "#dc3545",
        }).then(async (result) => {
            if (result.isConfirmed) {
                this.store.dispatch(deleteUser({ userId: this.user.id }));
                Swal.fire("Deleted!", "You have successfully Deleted.", "success");
            }
            else {
                Swal.fire("Cancelled", "You didn’t Delete the User.", "info");
            }
        })
    };

    onEdit() {
        this.store.dispatch(selectUserForEdit({ user: this.user }));
        this.router.navigate(["/adduser"]);
    }
}
