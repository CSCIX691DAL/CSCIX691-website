import { Component, OnInit } from '@angular/core';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  testimonials: Object[]


  updateEmail() {
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let curEmail = localStorage.getItem('email');
    let user = this.userService.getUserByEmail(email);
    if (email == curEmail) {
      this.userService.updateUser(user, { "emailList": false});
              alert("Unsubscribe Successfully!")
              }
    else if (user == null) {
      alert("Invalid Input or Unregistered Email Address!")
      }
    else{
      alert("It is not your current E-mail address! Please try again!")
    }
  }
}
