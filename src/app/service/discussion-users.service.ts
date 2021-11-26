import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Discussion from '../discussion-board/discussion.model';
import { UserService } from './../service/user.service';

@Injectable({
  providedIn: 'root'
})
  export class DiscussionService {
    discussionReference: AngularFireList<Discussion>;
    discussion?: Discussion[];

  constructor(private db: AngularFireDatabase) {
    this.discussionReference = db.list('discussion/');
    this.refreshDiscussion();
  }

  // Returns a list of discussions
  getDiscussion() : Discussion[] {
    return this.discussion;
  }

  // Populates the list of discussions by reading from the database
  refreshDiscussion(): void {
    this.discussionReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.discussion = data;
    });
  }

  // Adds a new discussion
  createDiscussion(discussion: Discussion): any {
    let reference = this.discussionReference.push(discussion);
    this.refreshDiscussion(); // update list of discussion
    return reference;
  }

  // Change an existing discussion
  updateDiscussion(discussion: Discussion, changes: Object): Promise<void> {
    return this.discussionReference.update(discussion.key, changes);
  }

  // Delete a discussion from the database
  deleteDiscussion(discussion: Discussion): Promise<void> {
    return this.discussionReference.remove(discussion.key);
  }

}
