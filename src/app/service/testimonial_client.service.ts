import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Testimonial from '../client-dash/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
    testimonialReference: AngularFireList<Testimonial>;
    testimonial?: Testimonial[];

  constructor(private db: AngularFireDatabase) {
    this.testimonialReference = db.list('testimonial/');
    this.refreshTestimonial();
  }

  // Returns a list of Announcements
  getTestimonial() : Testimonial[] {
    return this.testimonial;
  }

  // Populates the list of Announcements by reading from the database
  refreshTestimonial(): void {
    this.testimonialReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.testimonial = data;
    });
  }

  // Adds a new testimonial
  createTestimonial(testimonial: Testimonial): any {
    let reference = this.testimonialReference.push(testimonial);
    this.refreshTestimonial(); // update list of testimonial
    return reference;
  }

  // Change an existing Announcement
  updateTestimonial(testimonial: Testimonial, changes: Object): Promise<void> {
    return this.testimonialReference.update(testimonial.key, changes);
  }

  // Delete an testimonial from the database
  deleteTestimonial(testimonial: Testimonial): Promise<void> {
    return this.testimonialReference.remove(testimonial.key);
  }

}
