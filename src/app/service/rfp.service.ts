import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RfpService {

  constructor(private db: AngularFireDatabase) { }

  // Returns the testimonial collection in the database
  getRFPs() {
    return this.db.database.ref('RFPs/').get();
  }

  // Sets the status from pending to approved
  ApproveRFP(rfp: Object) {
    // *********THIS FUNCTION NEEDS TO CHANGE THE STATUS OF THE RFP PASSED TO APPROVED *********
    // this.db.database.ref('RFPs/').child(rfp['']).set({
    //   status: 'Approved',
    // });
  }

  // Sets the status from pending to denied
  DenyRFP(rfp: Object) {
    // *********THIS FUNCTION NEEDS TO CHANGE THE STATUS OF THE RFP PASSED TO REJECTED *********
    // this.db.database.ref('RFPs/').child(rfp['projectTitle'] + '-' + rfp['organization']).set({
    //   status: 'Denied',
    // });
  }
}
