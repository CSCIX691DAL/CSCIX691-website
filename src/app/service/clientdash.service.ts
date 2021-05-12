import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
  }

  //Returns the testimonial collection in the database
  getTestimonials() {
    return this.db.database.ref('testimonial/').get();
  }

  getRFPs() {
    return this.db.database.ref('RFPs/').get();
  }

  submitRFP(projectTitle: string, contactName: string, organization: string, contactEmail: string, mailingAddress: string,
  problem: string, idealSituation: string, specifySpecificSoftware: string, specifyOtherReporting: string, specifyBudget: string,
  specifyUsabilityConsiderations: string, kindOfTests: string, sampleData: string, specificSoftware: string,
  videoCallMeeting: string, emailReporting: string, requireNDA: string, requireIP: string, budget: string,
  trainingSession: string, howToDocumentation: string, usabilityConsiderations: string, realLifeTesting: string,
  specifyTesters: string, projectAgreement: string, date: string): void{

	  this.db.database.ref('RFPs/').push({projectTitle:projectTitle, contactName:contactName, organization:organization,
	  contactEmail:contactEmail, mailingAddress:mailingAddress, problem:problem, idealSituation:idealSituation,
	  specifySpecificSoftware:specifySpecificSoftware, specifyOtherReporting:specifyOtherReporting, specifyBudget:specifyBudget,
	  specifyUsabilityConsiderations:specifyUsabilityConsiderations, kindOfTests:kindOfTests, sampleData:sampleData,
	  specificSoftware:specificSoftware, videoCallMeeting:videoCallMeeting, emailReporting:emailReporting, requireNDA:requireNDA,
	  requireIP:requireIP, budget:budget, trainingSession:trainingSession, howToDocumentation:howToDocumentation,
	  usabilityConsiderations:usabilityConsiderations, realLifeTesting:realLifeTesting, specifyTesters:specifyTesters,
	  projectAgreement:projectAgreement, date:date,
	  status:"Pending"});

  }

}
