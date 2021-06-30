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
    let user = this.userService.getUserByEmail(email);

    if (user == null){
      alert ("Invalid input")
    }
    else{
      this.userService.updateUser(user,{"emailList":false});
    }
  }
}