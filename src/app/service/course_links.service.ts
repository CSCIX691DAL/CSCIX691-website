import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import CourseLinks from '../course-links/course-links.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseLinksService {
  Course_LinksReference: AngularFireList<CourseLinks>;
  Course_Links?: CourseLinks[];

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
    this.Course_LinksReference = db.list('CourseLinks/');
    this.refreshCourse_Links();
  }

  // Returns a list of Course_Links
  getCourse_Links() : CourseLinks[] {
    return this.Course_Links;
  }

  // Populates the list of Course_Links by reading from the database
  refreshCourse_Links(): void {
    this.Course_LinksReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Course_Links = data;
    });
  }

  // Adds a new CourseLinks
  createCourseLinks(Course_Links: CourseLinks): any {
    let reference = this.Course_LinksReference.push(Course_Links);
    this.refreshCourse_Links(); // update list of Course_Links
    return reference;
  }

  // Change an existing CourseLinks
  updateCourseLinks(Course_Links: CourseLinks, changes: Object): Promise<void> {
    return this.Course_LinksReference.update(Course_Links.key, changes);
  }

  // Delete an CourseLinks from the database
  deleteCourseLinks(Course_Links: CourseLinks): Promise<void> {
    return this.Course_LinksReference.remove(Course_Links.key);
  }

}