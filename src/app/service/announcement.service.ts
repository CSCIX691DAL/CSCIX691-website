import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Announcement from '../admin-dash/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  announcementReference: AngularFireList<Announcement>;
  announcements?: Announcement[];

  constructor(private db: AngularFireDatabase) {
    this.announcementReference = db.list('Announcements/');
    this.refreshAnnouncements();
  }

  // Returns a list of Announcements
  getAnnouncements() : Announcement[] {
    return this.announcements;
  }

  // Populates the list of Announcements by reading from the database
  refreshAnnouncements(): void {
    this.announcementReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.announcements = data;
    });
  }

  // Adds a new Announcement
  createAnnouncement(announcement: Announcement): any {
    let reference = this.announcementReference.push(announcement);
    this.refreshAnnouncements(); // update list of Announcements
    return reference;
  }

  // Change an existing Announcement
  updateAnnouncement(announcement: Announcement, changes: Object): Promise<void> {
    return this.announcementReference.update(announcement.key, changes);
  }

  // Delete an Announcement from the database
  deleteAnnouncement(announcement: Announcement): Promise<void> {
    return this.announcementReference.remove(announcement.key);
  }

}
