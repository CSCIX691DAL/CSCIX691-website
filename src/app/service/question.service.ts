import { Injectable } from '@angular/core';

import { DropdownQuestion } from '../questionnaire/questionDropdown';
import { QuestionBase } from '../questionnaire/questionBase';
import { TextboxQuestion } from '../questionnaire/questionTextbox';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

        new TextboxQuestion({
            key: 'firstName',
            label: 'First name',
            required: true
        }),

        new TextboxQuestion({
            key: 'emailAddress',
            label: 'Email',
            type: 'email'
        }),

        new DropdownQuestion({
            key: 'brave',
            label: 'Bravery Rating',
            options: [
                {key: 'solid',  value: 'Solid'},
                {key: 'great',  value: 'Great'},
                {key: 'good',   value: 'Good'},
                {key: 'unproven', value: 'Unproven'}
            ]
        })
    ];

    return of(questions);
  }
}