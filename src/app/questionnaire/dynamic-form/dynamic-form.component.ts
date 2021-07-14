/*
* Methods used for submiting form and saving it as JSON. This is where functions used for submitting to the firebase would be called.
*/
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../questionBase';
import { QuestionControlService } from '../../service/questionControl.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  //TODO: Make the following method also submit questionnaire information to firebase. The idea was to save this under the specific user in the user table.
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}