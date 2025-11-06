import { createReducer, on } from '@ngrx/store';
import { courseList } from '../../common/types/courseList';
import {
    loadCourses,
    loadCoursesSucess,
    loadCoursesFailure,
    addCourseSuccess,
    addCourseFailed,
    deleteCourseSuccess,
    deleteCourseFaild,
    deleteCourse,
    selectCourseForEdit,
    clearSelectedCouse,
} from './course.actions';

export interface CourseState {
    // get
    courses: courseList[];
    loading: boolean;
    error: string | null;

    // add
    addCourseSuccess: boolean;
    addCourseError: string | null;

    // delete
    deleteCourseSuccess: boolean;
    deleteCourseError: string | null;

    // edit
    SelectedCourse: courseList | null;
}

export const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null,
    addCourseSuccess: false,
    addCourseError: null,
    deleteCourseError: null,
    deleteCourseSuccess: false,
    SelectedCourse: null,
};

export const courseReducer = createReducer(
    initialState,

    // get
    on(loadCourses, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(loadCoursesSucess, (state, { courses }) => ({
        ...state,
        courses,
        loading: false,
        error: null,
    })),

    on(loadCoursesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // add
    on(addCourseSuccess, (state, { course }) => ({
        ...state,
        loading: false,
        courses: [...state.courses, course],
        addCourseError: null,
        addCourseSuccess: true,
    })),

    on(addCourseFailed, (state, { error }) => ({
        ...state,
        loading: false,
        addCourseSuccess: false,
        addCourseError: error
    })),

    // delete
    on(deleteCourse, (state) => ({
        ...state,
        deleteCourseSuccess: false,
        deleteCourseError: null
    })),

    on(deleteCourseSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        deleteCourseError: null,
        deleteCourseSuccess: true,
        courses: state.courses.filter(x => x.id !== id),
    })),

    on(deleteCourseFaild, (state, { error }) => ({
        ...state,
        loading: false,
        deleteUserError: error
    })),

    // edit
    on(selectCourseForEdit, (state, { course }) => ({
        ...state,
        SelectedCourse: course
    })),

    on(clearSelectedCouse, (state) => ({
        ...state,
        selectedUser: null
    }))
);
