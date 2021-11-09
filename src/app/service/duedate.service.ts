import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import DueDate from '../dueDates/dueDates.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class dueDateService {
  dueDateReference: AngularFireList<DueDate>;
  dueDates?: DueDate[];

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
    this.dueDateReference = db.list('DueDates/');
    this.refreshdueDates();
  }

  // Returns a list of dueDates
  getdueDates() : DueDate[] {
    return this.dueDates;
  }

  // Populates the list of dueDates by reading from the database
  refreshdueDates(): void {
    this.dueDateReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dueDates = data;
    });
  }

  // Adds a new DueDate
  createdueDate(dueDates: DueDate): any {
    let reference = this.dueDateReference.push(dueDates);
    this.refreshdueDates(); // update list of dueDates
    return reference;
  }

  // Change an existing DueDate
  updatedueDate(dueDates: DueDate, changes: Object): Promise<void> {
    return this.dueDateReference.update(dueDates.key, changes);
  }

  // Delete an DueDate from the database
  deletedueDate(dueDates: DueDate): Promise<void> {
    return this.dueDateReference.remove(dueDates.key);
  }

}
