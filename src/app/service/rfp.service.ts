import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from '../rfp/rfp.model';

@Injectable({
  providedIn: 'root'
})
export class RfpService {
  rfpReference: AngularFireList<RFP>;
  rfps?: RFP[];

  constructor(private db: AngularFireDatabase) {
    this.rfpReference = db.list('RFPs/');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.refreshRFPs();
  }

  // Returns a list of RFPs
  getRFPs() : RFP[] {
    return this.rfps;
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

  // Returns a document structure for generating a PDF for a given RFP
  getDocumentDefinition(rfp: RFP) : Object {
    return {
      content: [
        {text: 'Project title: ' + rfp.projectTitle + '\n\n', fontSize: 32},
        {
          ul: [
            'Contact Name: ' + rfp.contactName + '\n\n',
            'Organization: ' + rfp.organization + '\n\n',
            'Contact Email:' + rfp.contactEmail + '\n\n',
            'Mailing Address: ' + rfp.mailingAddress + '\n\n\n'
          ]
        },
        {text: 'Briefly describe the organization, including its mission or primary function(s)\n\n', style: 'header'},
        {
          ul: [
            rfp.problem + '\n\n'
          ]
        },
        {text: 'Describe the ideal situation if this problem were solved in the best possible way (whatever that might be)' + '\n\n', style: 'header'},
        {
          ul: [
            'Ideal Situation: ' + rfp.idealSituation + '\n\n',
            'Specific Software: ' + rfp.specifySpecificSoftware + '\n\n',
            'Specific and detailed reporting: ' + rfp.specifyOtherReporting + '\n\n',
            'Budget: ' + rfp.specifyBudget + '\n\n',
            'Usability Considerations: ' + rfp.specifyUsabilityConsiderations + '\n\n',

          ]
        },
      ]
    };
  }
}
