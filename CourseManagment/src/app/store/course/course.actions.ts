import { createAction, props } from "@ngrx/store";
import { courseList } from "../../common/types/courseList";
import { CourseAdd } from "../../common/types/courseAdd";
import { CourseUpdate } from "../../common/types/courseUpdate";

// Get
export const loadCourses = createAction(
    '[course] load course'
);

export const loadCoursesSucess = createAction(
    '[course] course success',
    props<{ courses: courseList[] }>()
);

export const loadCoursesFailure = createAction(
    '[course] course Failer',
    props<{ error: string }>()
);

// Add
export const addCourse = createAction(
    '[Course] add Course',
    props<{ course: CourseAdd }>()
)

export const addCourseSuccess = createAction(
    '[Course] AddCourse Successfull',
    props<{ course: courseList }>()
)

export const addCourseFailed = createAction(
    '[Course] Addcourse Faild',
    props<{ error: any }>()
)

// Delete
export const deleteCourse = createAction(
    '[Course] delete Course',
    props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
    '[Course] deleteCourse Success',
    props<{ id: number }>()
);

export const deleteCourseFaild = createAction(
    '[Course] delteCourse Failed',
    props<{ error: any }>()
);

// Edit 
export const selectCourseForEdit = createAction(
    '[User] Select Course For Edit',
    props<{ course: courseList }>()
);

export const clearSelectedCouse = createAction(
    '[User] Clear Selected Course'
);

// Update 
export const UpdateCourse = createAction(
    '[Course] Update Course',
    props<{ course: CourseUpdate }>()
);

export const UpdateCourseSuccess = createAction(
    '[Course] Update CourseSucess',
    props<{ course: courseList }>()
);

export const updateCourseFailed = createAction(
    '[Course] courseUpdate Failed',
    props<{ error: any }>()
);