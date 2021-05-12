import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("isLogin")) {
      window.location.href = "/";
    }
  }

}
