import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseService } from "../../services/course.service";
import * as CourseAction from "../course/course.actions"
import { catchError, mergeMap, map, of } from "rxjs";

@Injectable()
export class CourseEffects {

    private actions$: Actions = inject(Actions);
    private courseService: CourseService = inject(CourseService);

    loadCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseAction.loadCourses),
            mergeMap(() =>
                this.courseService.getCouses().pipe(
                    map((courses) => CourseAction.loadCoursesSucess({ courses })),
                    catchError((error) =>
                        of(CourseAction.loadCoursesFailure({ error: error?.error?.message || 'Failed to load courses', }))
                    )
                )
            )
        )
    );

    addCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseAction.addCourse),
            mergeMap((action) =>
                this.courseService.addCourse(action.course).pipe(
                    map((course) => CourseAction.addCourseSuccess({ course })),
                    catchError((error) =>
                        of(CourseAction.addCourseFailed({ error: error?.error?.message || 'Faild to add Course' }))
                    )
                )
            )
        )
    );

    deleteCouse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseAction.deleteCourse),
            mergeMap((action) =>
                this.courseService.deletCourse(action.id).pipe(
                    map((course) => CourseAction.deleteCourseSuccess({ id: action.id })),
                    catchError((error) =>
                        of(CourseAction.deleteCourseFaild({ error: error?.error?.message || "Faild to Delete Course" }))
                    )
                )
            )
        )
    );

    
}