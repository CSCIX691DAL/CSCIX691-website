import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Client } from "../user/client.model";
import { Student } from "../user/student.model";
import { User } from "../user/user.model";
import { UserType } from '../user/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  userReference: AngularFireList<User>;
  users?: User[];

  constructor(private db: AngularFireDatabase) {
    this.userReference = db.list('users/');
  }

  // Populates the list of users by reading from the database
  refreshUsers(): void {
    this.userReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  // Adds a user to the database
  addUser(id: string, user: User) {
    let reference = this.userReference.set(id, user);
    this.refreshUsers(); // update list of users
    return reference;
  }

  addClient(id: string, email: string, firstName: string, lastName: string, organization: string): void {
    // construct the client object
    let client = new Client();
    client.email = email;
    client.fName = firstName;
    client.sName = lastName;
    client.org = organization;
    client.userType = UserType.Client;

    // add client to database
    this.addUser(id, client);
  }

  addStudent(id: string, email: string, firstName: string, lastName: string, studentID: string, isTeamLeader: boolean): void {
    // construct the student object
    let student = new Student();
    student.email = email;
    student.fName = firstName;
    student.sName = lastName;
    student.studentID = studentID;
    student.userType = UserType.Student;
    student.teamLeader = isTeamLeader;

    // add student to database
    this.addUser(id, student);
  }
}