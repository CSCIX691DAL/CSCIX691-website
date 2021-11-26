import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { QuestionService } from './student-questionnaire/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [QuestionService]

})
export class AppComponent {
  title = 'X691Website';

  constructor(public authService: AuthService, public fireAuth: AngularFireAuth, private router: Router) {

  }



}
