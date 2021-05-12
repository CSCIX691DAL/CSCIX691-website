import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-changepw',
  templateUrl: './changepw.component.html',
  styleUrls: ['./changepw.component.css']
})
export class ChangepwComponent {
  FIELDS_NOT_FILLED = 'Please fill out all fields. '
  PASSWORD_NOT_SECURE = 'Password must be at least 6 characters long. '
  PASSWORD_MATCH = 'Passwords do not match.'
  CONFIRM_PASSWORD = 'Please confirm Password.'
  NOT_PASSWORD = 'This is not your password! Stop hacking!'
  // INCORRECT_BANNER_FORMAT = 'Not a valid banner number. '

  errorMessage = '';
  password: string;
  resetPassword: boolean;
  email = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(public authService: AuthService, private router: Router, private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }



  sendResetEmail() {
    this.clearErrorMessage();

    //this.authService.changePassword(this.email)
    this.authService.resetPassword(this.email).then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error
      })
  }

//   validate(password:string): boolean {
//     this.errorMessage = '';

//     if(!this.password || !this.email) {
//       this.errorMessage = this.FIELDS_NOT_FILLED;
//       return false;
//     }

// //check firebase pw and compare them. if not right, print error


//     // if(this.password.length == 0) {
//     //   this.errorMessage = this.PASSWORD_NOT_SECURE;
//     // }
//     return true;
//   }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }



}
