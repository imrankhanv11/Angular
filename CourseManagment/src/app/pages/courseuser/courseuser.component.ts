import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { courseList } from '../../common/types/courseList';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourse, selectCourseError, selectCourseLoading } from '../../store/course/course.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courseuser.component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './courseuser.component.html',
  styleUrl: './courseuser.component.css',
})
export class CourseuserComponent implements OnInit {
  courses$!: Observable<courseList[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private store = inject(Store);

  ngOnInit(): void {
    this.courses$ = this.store.select(selectAllCourse);

    this.courses$
      .pipe(
        take(1),
        tap(() => {
          this.store.dispatch(loadCourses());
        })
      )
      .subscribe();

    this.loading$ = this.store.select(selectCourseLoading);
    this.error$ = this.store.select(selectCourseError);
  }
}
