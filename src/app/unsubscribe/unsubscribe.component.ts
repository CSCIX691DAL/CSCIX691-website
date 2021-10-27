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


  updateEmail(){
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    
    let userEmail = this.userService.getUserEmail();
    //get user email
    

    if (userEmail == null){
      alert ("Invalid input");
    }else if (email=userEmail){ 
      this.userService.unsubscribeUser();
      alert ("You have unsubscribed from our email list");
    }else if (email!=userEmail){
      alert("You input email is not your email");
    }
  }
  

}