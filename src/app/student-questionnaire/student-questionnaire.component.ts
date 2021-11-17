import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import Questionnaire from './student-questionnaire.model';
import {DynamicFormControlModel,DynamicFormService,DynamicInputModel} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-student-questionnaire',
  templateUrl: './student-questionnaire.component.html',
  styleUrls: ['./student-questionnaire.component.css']
})
export class StudentQuestionnaireComponent implements OnInit {
  formModel: DynamicFormControlModel[] = [
       new DynamicInputModel({
           id: 'Sample1',
           label: 'test 1',
           placeholder: 'fill in your test'
         })
       ];
    
       formGroup: FormGroup;
  
       constructor(private formService: DynamicFormService) {
       }
    
       ngOnInit() {
      this.formGroup = this.formService.createFormGroup(this.formModel);
      }
    

}
