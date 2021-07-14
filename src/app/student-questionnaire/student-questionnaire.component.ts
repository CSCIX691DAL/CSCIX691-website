/*
* Component that starts displaying the questions returned from the question.service.ts file. The template calls the dynamic-form html file.
* This was all created with help from https://angular.io/guide/dynamic-form
*/
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
export class StudentQuestionnaireComponent{
  questions$: Observable<QuestionBase<any>[]>;

  constructor(private service: QuestionService) {
    this.questions$ = this.service.getQuestions();
  }
}
