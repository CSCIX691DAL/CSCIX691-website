import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import 'firebase/auth';
import { UserType } from '../user/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
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
        this.userService.addStudent(value.user.uid, email, firstName, lastName, studentID, isTeamLeader);
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


  loginWithCsId(csid: string, password: string): void {
    this.http.post(`${environment.apiURL}/auth/authentication`, { "username": csid, "password": password }).subscribe(data => {
      if (data["result"] === false){
        alert(`Something went wrong: ${data["cause"]}`);
      } else {
        let csidUserId = `${data["bNum"]}-${data["uidNumber"]}`;
        console.log(csidUserId);
        this.db.database.ref(('users/' + csidUserId)).get().then(value => {
          let userInfo = value.toJSON();
          if (userInfo == null) {
            this.userService.addStudent(csidUserId, data["email"], data["fName"], data["lName"], data["bNum"], false);
            alert('It looks like it is your first time logging in with csid! Your account has been initialized, please login again.');
          } else {
            this.db.database.ref(('users/' + csidUserId)).update({hasLoggedInBefore: true});
            console.log('Login was a success!');
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('isCsidLogin', 'true');
            localStorage.setItem('uid', csidUserId);
            localStorage.setItem('name', userInfo['fName'] + " " + userInfo['sName']);
            localStorage.setItem('email', userInfo['email']);
            localStorage.setItem('org', userInfo['org']);
            if (userInfo['userType'] == UserType.Admin) {
              localStorage.setItem("userType", "admin");
              window.location.href = "/admin-dashboard";
            } else if (userInfo['userType'] == UserType.Client) {
              localStorage.setItem("userType", "client");
              window.location.href = "/client-dashboard";
            } else {
              localStorage.setItem("userType", "student");
              if (!userInfo['active'] && userInfo['hasLoggedInBefore']) {
                alert('Your account is inactive.');
              } else {
                window.location.href = "/student-dashboard";
              }
            }
          }

        }).catch(err => {
          localStorage.clear();
          console.warn('Something went wrong:', err.message);
          alert(err.message);
        });
      }
    });
  }

  login(email: string, password: string): void {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        let userId = value.user.uid;
        this.db.database.ref(('users/' + userId)).get().then(value => {
          let userInfo = value.toJSON();
          this.db.database.ref(('users/' + userId)).update({ hasLoggedInBefore: true });
          console.log('Login was a success!');
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('isCsidLogin', 'false');
          localStorage.setItem('uid', userId);
          localStorage.setItem('name', userInfo['fName'] + " " + userInfo['sName']);
          localStorage.setItem('email',userInfo['email']);
          localStorage.setItem('org',userInfo['org']);
          if (userInfo['userType'] == UserType.Admin) {
            localStorage.setItem("userType", "admin");
            window.location.href = "/admin-dashboard";
          } else if (userInfo['userType'] == UserType.Client) {
            localStorage.setItem("userType", "client");
            window.location.href = "/client-dashboard";
          } else {
            localStorage.setItem("userType", "student");
            if (!userInfo['active'] && userInfo['hasLoggedInBefore']) {
              alert('Your account is inactive.')
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
    if (localStorage.getItem('isCsidLogin') === 'false'){
      this.firebaseAuth.signOut();
    }
    localStorage.clear();

    window.location.href = "/";
    window.alert("logout succesfull");
  }
  // delete(): void{
  //   this.firebaseAuth.
  // }
}
