import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Contact from '../footer/contact.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactReference: AngularFireList<Contact>;
  contacts?: Contact[];

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
    this.contactReference = db.list('Contacts/');
    this.refreshContacts();
  }

  // Returns a list of Contacts
  getContacts() : Contact[] {
    return this.contacts;
  }

  // Populates the list of Contacts by reading from the database
  refreshContacts(): void {
    this.contactReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.contacts = data;
    });
  }

  // Adds a new Contact
  createContact(contact: Contact): any {
    let reference = this.contactReference.push(contact);
    this.refreshContacts(); // update list of Contacts
    return reference;
  }

  // Change an existing Contact
  updateContact(contact: Contact, changes: Object): Promise<void> {
    return this.contactReference.update(contact.key, changes);
  }

  // Delete an Contact from the database
  deleteContact(contact: Contact): Promise<void> {
    return this.contactReference.remove(contact.key);
  }

}
