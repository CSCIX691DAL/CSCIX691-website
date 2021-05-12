import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userType: string;

  constructor(public authService: AuthService) { }

  public isLogin: any=localStorage.getItem('isLogin')
  ngOnInit(): void {
    this.userType = localStorage.getItem("userType");
  }

  logout(){
    this.authService.logout();
  }
}
