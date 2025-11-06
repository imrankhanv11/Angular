import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { courseList } from '../../types/courseList';
import { deleteCourse, selectCourseForEdit } from '../../../store/course/course.actions';

@Component({
    selector: 'tr[app-courseadmin-row]',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'courseRowAdmin.component.html',
    styleUrls: ['courseRowAdmin.component.css']
})
export class CourseRowAdminComponent {
    @Input() course!: courseList;
    @Input() index!: number;

    private store: Store = inject(Store);
    private router: Router = inject(Router);

    onDelete(): void {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete this Course?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "No, Cancel",
            confirmButtonColor: "#198754",
            cancelButtonColor: "#dc3545",
        }).then(async (result) => {
            if (result.isConfirmed) {
                this.store.dispatch(deleteCourse({ id: this.course.id }));
                Swal.fire("Deleted!", "You have successfully Deleted.", "success");
            }
            else {
                Swal.fire("Cancelled", "You didn’t Delete the Course.", "info");
            }
        })
    };

    onEdit() {
        this.store.dispatch(selectCourseForEdit({ course: this.course }));
        this.router.navigate(["/addcourse"]);
    }
}
