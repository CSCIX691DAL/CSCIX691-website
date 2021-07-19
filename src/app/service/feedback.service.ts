import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Feedback from '../client-dash/clientFeedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedBacklService {
    feedBackReference: AngularFireList<Feedback>;
    feedback?: Feedback[];

  constructor(private db: AngularFireDatabase) {
    this.feedBackReference = db.list('feedback/');
    this.refreshFeedback();
  }

  // Returns a list of Announcements
  getFeedBack() : Feedback[] {
    return this.feedback;
  }

  // Populates the list of Announcements by reading from the database
  refreshFeedback(): void {
    this.feedBackReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.feedback = data;
    });
  }

  // Adds a new feedback
  createFeedback(Feedback: Feedback): any {
    let reference = this.feedBackReference.push(Feedback);
    this.refreshFeedback(); // update list of feedback
    return reference;
  }

  // Change an existing feedback
  updateFeedback(feedback: Feedback, changes: Object): Promise<void> {
    return this.feedBackReference.update(feedback.key, changes);
  }

  // Delete an feedback from the database
  deleteFeedback(feedback: Feedback): Promise<void> {
    return this.feedBackReference.remove(feedback.key);
  }
}
