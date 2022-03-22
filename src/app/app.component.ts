import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})


export class AppComponent {
  title = 'X691Website';
  questions: any[];

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(public authService: AuthService, public fireAuth: AngularFireAuth, private router: Router) {
    


  }
}
