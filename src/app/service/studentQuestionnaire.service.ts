import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentQuestionnaireService {

  constructor(private db: AngularFireDatabase) {
  }

  // Updates the format of the student questionnaire form according to a JSON object
  uploadQuestionnaireForm(form: Object) {
    this.db.database.ref('Forms/Student Questionnaire').set(form);
  }



}
