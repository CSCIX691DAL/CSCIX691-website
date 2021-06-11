import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private db: AngularFireDatabase) { }

  // Returns the announcements collection in the database
  getAnnouncements() {
    return this.db.database.ref('Announcements/').get();
  }

  // Pushes a new announcement to the database
  pushAnnouncement(Announcement: Object) {
    this.db.database.ref('Announcements/').push(Announcement);
  }

}