import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../service/clientdash.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-rfp',
  templateUrl: './rfp.component.html',
  styleUrls: ['./rfp.component.css'],
})
export class RfpComponent implements OnInit {
  RFPs: Object[];

  projectTitle: string;

  // Section
  contactName: string;
  organization: string;
  contactEmail: string;
  contactPhone: string;
  mailingAddress: string;

  // Problem
  problem: string;

  // Desired Outcome
  idealSituation: string;
  specifySpecificSoftware: string;
  specifyOtherReporting: string;
  specifyBudget: string;
  specifyUsabilityConsiderations: string;

  // Testing
  kindOfTests: string;
  sampleData: string;

  specificSoftware: string;
  videoCallMeeting: string;
  emailReporting: string;
  requireNDA: string;
  requireIP: string;
  budget: string;
  trainingSession: string;
  howToDocumentation: string;
  usabilityConsiderations: string;
  realLifeTesting: string;
  specifyTesters: string;
  projectAgreement: string;
  date: string;

  defaultOptions: any[] = [
    {name: 'Yes'},
    {name: 'No'},
  ];

  specificSoftwareOptions: any[] = [
    {name: 'Yes'},
    {name: 'No'},
    {name: 'Maybe'},
  ];

  reportingOptions: any[] = [
    {name: 'Weekly'},
    {name: 'Bi-Weekly'},
    {name: 'Not at all'},
  ];

  specifyTestersOptions: any[] = [
    {name: 'Student team'},
    {name: 'Someone from our office'},
    {name: 'Not applicable'},
  ];

  constructor(private firebaseService: FirebaseService) {
    this.RFPs = [];
  }

  ngOnInit(): void {
  }

  generatePDF(): void {
    const docDefinition = {
      content: [
        {text: 'Project title: ' + this.projectTitle + '\n\n', fontSize: 40},
        {
          ul: [
            'Contact Name: ' + this.contactName + '\n\n',
            'Organization: ' + this.organization + '\n\n',
            'Contact Email:' + this.contactEmail + '\n\n',
            'Contact Number: ' + this.contactPhone + '\n\n',
            'Mailing Address: ' + this.mailingAddress + '\n\n\n'
          ]
        },
        {text: 'Briefly describe the organization, including its mission or primary function(s)\n\n', style: 'header'},
        {
          ul: [
            this.problem + '\n\n'
          ]
        },
        {
          text: 'Describe the ideal situation if this problem were solved in the best possible way (whatever that might be)' + '\n\n',
          style: 'header'
        },
        {
          ul: [
            'Ideal Situation: ' + this.idealSituation + '\n\n',
            'Specific Software: ' + this.specifySpecificSoftware + '\n\n',
            'Specific and detailed reporting: ' + this.specifyOtherReporting + '\n\n',
            'Budget: ' + this.specifyBudget + '\n\n',
            'Usability Considerations: ' + this.specifyUsabilityConsiderations + '\n\n',
          ]
        },
      ]
    };

    if (this.projectTitle, this.contactName, this.organization, this.contactEmail, this.contactPhone,
      this.mailingAddress, this.problem, this.idealSituation, this.specifySpecificSoftware, this.specifyOtherReporting,
      this.specifyBudget, this.specifyUsabilityConsiderations, this.kindOfTests, this.sampleData) {

      console.log('in');
      pdfMake.createPdf(docDefinition).open();

      this.firebaseService.submitRFP(this.projectTitle, this.contactName, this.organization, this.contactEmail,
        this.mailingAddress, this.problem, this.idealSituation, this.specifySpecificSoftware, this.specifyOtherReporting,
        this.specifyBudget, this.specifyUsabilityConsiderations, this.kindOfTests, this.sampleData, this.specificSoftware,
        this.videoCallMeeting, this.emailReporting, this.requireNDA, this.requireIP, this.budget, this.trainingSession,
        this.howToDocumentation, this.usabilityConsiderations, this.realLifeTesting, this.specifyTesters, this.projectAgreement,
        this.date);


      alert('RFP submitted successfully');

    } else {
      alert('Please fill all of the required fields');
    }
  }
}
