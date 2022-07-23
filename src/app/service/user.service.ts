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
    db.database.ref('users/').on('value', snapshot => {
      this.users = snapshot.val();
    });
    this.refreshUsers();
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




//get the userEmail who is logged in


  getUserByEmail(email: string): User{
    let user = Object.values(this.users).filter((user, index, array) => {
      return (<User>user).email == email;
    });
    return <User>user[0];
  }

  getStudentByID(studentID: string): Student {
    let student = Object.values(this.users).filter((user, index, array) => {
      return (<Student>user).studentID == studentID;
    });

    return <Student>student[0];
  }

  getUserByID(userID: string){
    let user = Object.values(this.users).filter((user, index, array) => {
      return (<User>user).key == userID;
    });
    return <User>user[0];
  }
  //update input user email
  updateUserEmail(user: User, email: string): void {
    user.email = email;
    this.userReference.update(user.key, user);
  }
  unsubscribeUser(): void {
    this.db.database.ref('users/').off();
  }





  // Change an existing user
  updateUser(user: User, changes: Object): Promise<void> {
    return this.userReference.update(user.key, changes);
  }

  // Adds a user to the database
  addUser(id: string, user: User) {
    let reference = this.userReference.set(id, user);
    this.userReference.update(id, { key: id });
    this.refreshUsers(); // update list of users
    return reference;
  }

  deleteUser(user: User): Promise<void> {
    return this.userReference.remove(user.key);
  }


  addClient(id: string, email: string, firstName: string, lastName: string, organization: string): void {
    // construct the client object
    let client = new Client();
    client.active = true;
    client.email = email;
    client.fName = firstName;
    client.sName = lastName;
    client.org = organization;
    client.userType = UserType.Client;
    client.emailList = true;

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
    student.active = true;
    student.hasLoggedInBefore = false;
    student.emailList = true;

    // add student to database
    this.addUser(id, student);
  }

  isStudent(user: User): boolean {
    return user.userType == UserType.Student;
  }

  isClient(user: User): boolean {
    return user.userType == UserType.Client;
  }

  isAdmin(user: User): boolean {
    return user.userType == UserType.Admin;
  }
}
