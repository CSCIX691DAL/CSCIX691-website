import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  //Returns the testimonial collection in the database
  getPast() {
    return this.db.database.ref('Projects/').get();
  }
}
