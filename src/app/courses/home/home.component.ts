import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { Store } from "@ngrx/store";
import {
  selectAdvancedCourses,
  selectAllCourses,
  selectBeginerCourses,
  selectPromoCoursesTotal,
} from "../courses.selectors";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    const courses$ = this.store.select(selectAllCourses);

    this.beginnerCourses$ = this.store.select(selectBeginerCourses);

    this.advancedCourses$ = this.store.select(selectAdvancedCourses);

    this.promoTotal$ = this.store.select(selectPromoCoursesTotal);
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
