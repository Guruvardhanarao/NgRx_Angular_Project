import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

export interface CoursesState extends EntityState<Course> {
  loadedAllCourses: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
  loadedAllCourses: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCourseLoaded, (state, action) =>
    adapter.setAll(action.courses, { ...state, loadedAllCourses: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
