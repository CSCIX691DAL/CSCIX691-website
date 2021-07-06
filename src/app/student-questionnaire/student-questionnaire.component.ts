import { Component } from '@angular/core';

import { QuestionService } from '../service/question.service';
import { QuestionBase } from '../questionnaire/questionBase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-questionnaire',
  template: `
    <div class="d-flex justify-content-md-center">
      <h1 class="questionnaireTitle"> Student Questionnaire </h1>
    </div>
    <br>
    <div class="d-flex justify-content-md-center">
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
    </div>
  `,
  providers:  [QuestionService],
  styleUrls: ['./student-questionnaire.component.css']
})
export class StudentQuestionnaireComponent {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
