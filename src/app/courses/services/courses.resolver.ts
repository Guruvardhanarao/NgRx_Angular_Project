import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { CourseActions } from "../action-types";
import { areCoursesLoaded } from "../courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  private isLoaded: boolean = false;

  constructor(private store: Store) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((allCoursesLoaded) => {
        if (!this.isLoaded && !allCoursesLoaded) {
          this.isLoaded = true;
          this.store.dispatch(CourseActions.loadAllCourses());
        }
      }),
      filter((allCoursesLoaded) => allCoursesLoaded),
      first(),
      finalize(() => (this.isLoaded = false))
    );
  }
}
