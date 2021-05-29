import { RfpService } from './../service/rfp.service';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from './rfp.model';

@Component({
  selector: 'app-rfp',
  templateUrl: './rfp.component.html',
  styleUrls: ['./rfp.component.css'],
})
export class RfpComponent implements OnInit {
  rfp = new RFP();

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

  ngOnInit(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  constructor(private rfpService: RfpService) { }

  saveRFP(): void {
    this.rfpService.createRFP(this.rfp).then(() => {
      console.log('Created new RFP');
    })
  }

  newRFP(): void {
    this.rfp = new RFP();
  }

  // Used for creating a new RFP
  generatePDF(rfp: RFP) {
    if (rfp.projectTitle, rfp.contactName, rfp.organization, rfp.contactEmail, rfp.contactPhone,
      rfp.mailingAddress, rfp.problem, rfp.idealSituation, rfp.specifySpecificSoftware, rfp.specifyOtherReporting,
      rfp.specifyBudget, rfp.specifyUsabilityConsiderations, rfp.kindOfTests, rfp.sampleData) {

      console.log('in');
      const docDefinition = this.rfpService.getDocumentDefinition(rfp);
      pdfMake.createPdf(docDefinition).open();

      this.rfpService.createRFP(rfp);
      alert('RFP submitted successfully');
      
    } else {
      alert('Please fill all of the required fields');
    }
  }
}
