import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //Possible errors
  FIELDS_NOT_FILLED = 'Please fill out all fields. '
  PASSWORD_NOT_SECURE = 'Password must be atleast 6 characters long. Must have a capital leter, small letter, special character and a number. Must be between 6-20 characters.'
  INCORRECT_EMAIL_FORMAT = 'Not a valid email address. '
  EMAIL_ALREADY_IN_USE = 'This email is already in use. '
  // INCORRECT_BANNER_FORMAT = 'Not a valid banner number. '

  errorMessage = '';
  //mat-slider defaults to undefined on page load
  //client = false;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  //password defaults to undefined on page load
  password = '';
  // banner: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("isLogin")) {
      window.location.href = "/";
    }
  }

  onSubmit(): void {
    if(this.validate()) {
      this.authService.signupClient(this.email, this.password, this.firstName, this.lastName, this.organization);
    }
  }

  // onClientClicked(): void {
  //   if(!this.client) {
  //     document.getElementById('banner').hidden = true;
  //   }
  //   else {
  //     document.getElementById('banner').hidden = false;
  //   }
  // }

  //Use this function to validate form input
  validate(): boolean {
    this.errorMessage = '';

    if(!this.email || !this.password || !this.firstName || !this.lastName || !this.organization) {
      this.errorMessage = this.FIELDS_NOT_FILLED;
      return false;
    }

    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if(this.password.length < 6 || !regex.test(this.password)){
      this.errorMessage = this.PASSWORD_NOT_SECURE;
      return false;
    }


    // let bannerRegex = new RegExp('[Bb][\d]+');
    // if(!this.client && !bannerRegex.test(this.banner)) {
    //   this.errorMessage = this.INCORRECT_BANNER_FORMAT;
    // }

    return true;
  }
}
