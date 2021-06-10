import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database'
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  authState: any = null;
  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.firebaseAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  signup(email: string, password: string, firstName: string, lastName: string, organization: string): void {
    //Attempt to create a new user in the authentication database
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)

      .then(value => {
        //console.log('Success!', value);
        var userId = value.user.uid;
        this.db.database.ref('users/' + userId).set({
          email: email,
          admin: false,
          active:true,
          fName: firstName,
          sName: lastName,
          org: organization
        });
        this.login(email, password);

      })
      .catch(err => {
        localStorage.clear();
        console.log('Something went wrong:', err.message);
        alert(err.message);
      });
  }

  signupStudent(email: string, password: string, firstName: string, lastName: string, studentID: string): Promise<void> {
    //Attempt to create a new user in the authentication database
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)

      .then(value => {
        //console.log('Success!', value.user);
        var userId = value.user.uid;
        this.db.database.ref('users/' + userId).set({
          email: email,
          admin: false,
          active:false,
          fName: firstName,
          sName: lastName,
          studentID: studentID
        });

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
          if (userInfo['admin']) {
            localStorage.setItem("userType", "admin");
            window.location.href = "/admin-dashboard";
          } else if (userInfo['org']) {
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
