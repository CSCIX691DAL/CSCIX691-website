import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import Questionnaire from '../student-questionnaire/student-questionnaire.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
@Injectable({
  providedIn: 'root'
})

export class QuestionnaireService {
  questReference: AngularFireList<Questionnaire>;
  quest?: Questionnaire[];

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
    this.questReference = db.list('StudentQuestionnaire/');
    this.refreshQuestionnaire();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

  }


  getQuest() : Questionnaire[] {
    return this.quest;
  }

  refreshQuestionnaire(): void {
    this.questReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.quest = data;
    });
  }


    // Returns a document structure for generating a PDF for a given RFP
    getDocumentDefinition(quest: Questionnaire) : Object {
      // define required fields
      let documentDefinition = {
        content: [
          { text:  'Questionnaire: ' + quest.firstName + ' '+ quest.familyName + '\n\n', fontSize: 32, style: 'header' },
          {
            ul: [
              'BannerID: ' + quest.b00 + '\n\n',
              'Course: ' + quest.course + '\n\n',
              'Project Choice 1: ' + quest.projectChoice1 + '\n\n',
              'Project Choice 2: ' + quest.projectChoice2 + '\n\n',
              'Project Choice 3: ' + quest.projectChoice3 + '\n\n',
              'Like to be a leader?: ' + quest.leader + '\n\n',
              'Taken any of CSCI 2691, 3691, 4691 in Summer 2020, or Fall 2020?: ' + quest.pastCourses + '\n\n',
              'Like to be a student representative?: ' + quest.studentRep + '\n\n',
              'Comfortable accepting the IP and NDA policies of the client?: ' + quest.ipNDA + '\n\n',
              'Past Remote versions of CSCI X691: ' + quest.pastRemote + '\n\n',
              'If answered Yes: ' + quest.improve + '\n\n',
              'Accommodations?: ' + quest.acc + '\n\n',
              'Operating systems?: ' + quest.operatingSystem + '\n\n',
              'Background/experience: ' + quest.backgroundEX + '\n\n',
              'Experience in Agile Software development: ' + quest.pastAgileSoft + '\n\n',
              'Familiar with GitLab?: ' + quest.pastGitEX + '\n\n',
              'Familiar with Agile/Scrum?: ' + quest.pastAgileScrum + '\n\n',
              'Familiar with AngularJS/Angular?: ' + quest.pastAngular + '\n\n',
              'Familiar with ReactJS?: ' + quest.pastReact + '\n\n',
              'Familiar with NextJS: ' + quest.pastNext + '\n\n',
              'Familiar with Flutter: ' + quest.pastFlutter + '\n\n',
              'Familiar with Firebase: ' + quest.pastFirebase + '\n\n',
              'Familiar with Azure Board: ' + quest.pastAzure + '\n\n',
              'Familiar with AEM: ' + quest.pastAEM + '\n\n',
              'Familiar with HTML,CSS: ' + quest.pastHTMLCSS + '\n\n',
              'Familiar with PHP: ' + quest.pastPHP + '\n\n',
              'Familiar with Wireframing: ' + quest.pastWire + '\n\n',
              'Familiar with Digital Animation: ' + quest.pastAnimation + '\n\n',
              'Familiar with Augmented Reality: ' + quest.pastReality + '\n\n',
              'Time Zone: ' + quest.timeZone + '\n\n',


            ]
          }
        ]
      };
      return documentDefinition;
    }
}