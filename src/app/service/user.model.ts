import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

export class User {
  uid: Observable<string>;
  fullName: string;
  email: string;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, name: string, email: string) {
    this.uid = auth.idToken;
    this.fullName = name;
    this.email = email;

  }

  public create(name: string, email: string): void {
    this.fullName = name;
    this.email = email;
  }

}
