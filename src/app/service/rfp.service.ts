import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from '../rfp/rfp.model';
import { fileURLToPath } from 'url';

@Injectable({
  providedIn: 'root'
})
export class RfpService implements OnInit {
  rfpReference: AngularFireList<RFP>;
  rfps?: RFP[];
  submissionForm: Object;

  constructor(private db: AngularFireDatabase) { 
    this.rfpReference = this.db.list('RFPs/');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.refreshRFPs();

    // get the RFP submission form from the database
    this.db.database.ref('Forms/RFP Submission Form').get().then(value => {
      this.submissionForm = value.val();
    }).catch(exception => {
      console.log(exception);
    });
    
  }

  ngOnInit(): void {
    
  }

  // Returns a list of RFPs
  getRFPs() : RFP[] {
    return this.rfps;
  }

  getRFPByKey(key: string): RFP {
    let rfp = this.getRFPs().filter((rfp, index, array) => {
      return rfp.key == key;
    });

    return rfp[0];
  }

  // Populates the list of RFPs by reading from the database
  refreshRFPs(): void {
    this.rfpReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.rfps = data;
    });
  }

  // Adds a new RFP
  createRFP(rfp: RFP): any {
    let reference = this.rfpReference.push(rfp);
    this.refreshRFPs(); // update list of RFPs
    return reference;
  }

  // Change an existing RFP
  updateRFP(rfp: RFP, changes: Object): Promise<void> {
    return this.rfpReference.update(rfp.key, changes);
  }

  // Delete an RFP from the database
  deleteRFP(rfp: RFP): Promise<void> {
    return this.rfpReference.remove(rfp.key);
  }

  // Updates the format of the RFP submission form according to a JSON object
  uploadSubmissionForm(form: Object) {
    this.db.database.ref('Forms/RFP Submission Form').set(form);
  }

  // Gets the RFP submission form
  getSubmissionForm(): Object {
    return this.submissionForm;
  }

  // Returns a document structure for generating a PDF for a given RFP
  getDocumentDefinition(rfp: RFP) : Object {
    // define required fields
    let documentDefinition = {
      content: [
        { text: 'Project title: ' + rfp.projectTitle + '\n\n', fontSize: 32, style: 'header' },
        {
          ul: [
            'Contact Name: ' + rfp.contactName + '\n\n',
            'Organization: ' + rfp.organization + '\n\n',
            'Contact Email:' + rfp.contactEmail + '\n\n',
            'Mailing Address: ' + rfp.mailingAddress + '\n\n\n'
          ]
        }
      ]
    };

    // add answers to supplementary questions
    for(let [key, value] of Object.entries(rfp.supplementaryAnswers)) {
      // add the question
      documentDefinition["content"].push({ text: this.submissionForm["questions"][key]["question"] + '\n\n', fontSize: 12, style: 'header' });
      // add the answer
      documentDefinition["content"].push({ ul: [ value.toString() + '\n\n' ] })
    }

    return documentDefinition;
  }
  //-------------------------------------------------------------------------
  //uploadQuestionnaire(questionnaire: Object) {
 //   this.db.database.ref('Forms/Questionnaire').set(questionnaire);
  //}
//---------------------------------------------------------------
}
//JSON file
// {
//   "questions": {
//     "1": {
//       "question": "What is the name of the project?"
//     },
//     "2": {
//       "question": "What is the name of the organization?"
//     },
//     "3": {
//       "question": "What is the contact email?"
//     },
//}
//}
