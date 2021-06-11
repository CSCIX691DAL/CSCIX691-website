import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Router } from '@angular/router';
import 'firebase/auth';
import { UserType } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, private userService: UserService) {
    this.firebaseAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  signupClient(email: string, password: string, firstName: string, lastName: string, organization: string): void {
    //Attempt to create a new user in the authentication database
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        // add client to database
        this.userService.addClient(value.user.uid, email, firstName, lastName, organization);
        console.log('Successfully created client.');
        this.login(email, password);
      })
      .catch(err => {
        localStorage.clear();
        console.log('Something went wrong:', err.message);
        alert(err.message);
      });
  }

  signupStudent(email: string, password: string, firstName: string, lastName: string, studentID: string, isTeamLeader: boolean): Promise<void> {
    //Attempt to create a new user in the authentication database
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        // add student to database
        this.userService.addStudent(value.user.uid, email, firstName, lastName, studentID, isTeamLeader, false);
        console.log('Successfully created student.');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        alert(err.message);
      });
  }

  resetPassword(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email)
      .then(value => {
        console.log('Reset sent successfully');
      })
      .catch(err => {
        console.log('An error occurred while sending the reset: ' + err.message);
      });
  }

  login(email: string, password: string): void {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        let userId = value.user.uid;
        this.db.database.ref(('users/' + userId)).get().then(value => {
          let userInfo = value.toJSON();
          console.log('Login was a success!');
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('name', userInfo['fName'] + " " + userInfo['sName']);
          if (userInfo['userType'] == UserType.Admin) {
            localStorage.setItem("userType", "admin");
            window.location.href = "/admin-dashboard";
          } else if (userInfo['userType'] == UserType.Client) {
            localStorage.setItem("userType", "client");
            window.location.href = "/client-dashboard";
          } else {
            localStorage.setItem("userType", "student");
            if (!(userInfo['active'] === undefined) && (userInfo['active'] === false)) {
              window.location.href = "/changepw";
            } else {
              window.location.href = "/student-dashboard";
            }
          }
        });

      })
      .catch(err => {
        localStorage.clear();
        console.warn('Something went wrong:', err.message);
        alert(err.message);
      });
  }

  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.clear();
    window.location.href = "/";
  }
}
