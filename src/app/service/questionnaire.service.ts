import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import Questionnaire from '../student-questionnaire/student-questionnaire.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuestionnaireService {
  announcementReference: AngularFireList<Questionnaire>;
  quest?: Questionnaire[];

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
    this.announcementReference = db.list('StudentQuestionnaire/');

  }

  // Returns a list of Announcements
  getQuest() : Questionnaire[] {
    return this.quest;
  }


}