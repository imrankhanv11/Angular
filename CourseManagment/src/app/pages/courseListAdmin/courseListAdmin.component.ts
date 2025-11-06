import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { courseList } from "../../common/types/courseList";
import { CourseRowAdminComponent } from "../../common/components/courseRowAdmin/courseRowAdmin.component";
import {
    loadCourses,
} from "../../store/course/course.actions";
import {
    selectAllCourse,
    selectCourseLoading,
    selectCourseError,
} from "../../store/course/course.selector";

@Component({
    selector: "app-course-list-admin",
    standalone: true,
    imports: [CommonModule, CourseRowAdminComponent],
    templateUrl: "./courseListAdmin.component.html",
    styleUrls: ["./courseListAdmin.component.css"],
})
export class CourseListAdminComponent implements OnInit {
    courses$!: Observable<courseList[]>;
    loading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    private store = inject(Store);

    ngOnInit(): void {
        this.courses$ = this.store.select(selectAllCourse);

        this.courses$
            .pipe(
                take(1),
                tap((courses) => {
                    if (!courses || courses.length === 0) {
                        this.store.dispatch(loadCourses());
                    }
                })
            )
            .subscribe();

        this.loading$ = this.store.select(selectCourseLoading);
        this.error$ = this.store.select(selectCourseError);
    }
}
