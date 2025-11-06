import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CourseState } from "./course.reducer";

export const selectCourseState = createFeatureSelector<CourseState>('course');

// get
export const selectAllCourse = createSelector(
    selectCourseState,
    (state) => state.courses
);

export const selectCourseLoading = createSelector(
    selectCourseState,
    (state) => state.loading
);

export const selectCourseError = createSelector(
    selectCourseState,
    (state) => state.error
);

// add
export const selectAddCourseSuccess = createSelector(
    selectCourseState,
    (state) => state.addCourseSuccess
);

export const selectAddCourseFailed = createSelector(
    selectCourseState,
    (state) => state.addCourseError
);

// delete
export const selectDeleteUserSuccess = createSelector(
    selectCourseState,
    (state) => state.deleteCourseSuccess
);

export const selectDeleteUserError = createSelector(
    selectCourseState,
    (state) => state.deleteCourseError
);

// edit
export const selectCouseToEdit = createSelector(
    selectCourseState,
    (state) => state.SelectedCourse
);