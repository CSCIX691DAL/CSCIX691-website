import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
    username: string;
    password: string;
    error: any;
    resetEmail: string;

  constructor( public authService: AuthService, private router: Router, private modalService: NgbModal) {
  }

  // Login functionality that logs in existing user to firebase authentication
  public login(): void {
    console.log(this.username);
    this.authService.login(this.username, this.password);
    this.username = this.password = '';
    window.alert('login succesfull');
  }

  public loginWithCsId(): void {
    this.authService.loginWithCsId(this.username, this.password);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

  resetPassword() {
    this.authService.resetPassword(this.resetEmail);
    this.resetEmail = '';
    document.getElementById('resetConfirmation').hidden = false;
  }

  ngInclude(): void {

  }
  ngOnInit(): void {
    if (localStorage.getItem("isLogin")) {

      window.location.href = "/";

    }
  }

}
