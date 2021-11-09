import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  //Returns the testimonial collection in the database
  getTestimonials() {
    return this.db.database.ref('testimonial/').get();
  }
  getRFPs() {
	return this.db.database.ref('RFPs/').get();
  }
  getQuest() {
    return this.db.database.ref('StudentQuestionnaire/').get();
    }
}
