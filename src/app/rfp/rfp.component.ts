import { RfpService } from './../service/rfp.service';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from './rfp.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rfp',
  templateUrl: './rfp.component.html',
  styleUrls: ['./rfp.component.css'],
})
export class RfpComponent implements OnInit {
  rfp: RFP;
  id: string | undefined;
  editMode: boolean;

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
    // get RFP id, if applicable
    this.id = this.route.snapshot.params['id'];
    // we are in edit mode if an id was specified
    this.editMode = this.id != undefined;

    if (this.editMode) {
      // get associated RFP from the database
      this.rfp = this.rfpService.getRFPByKey(this.id);
    } else {
      // create a new RFP
      this.rfp = new RFP();
    }
  }

  constructor(private rfpService: RfpService, private route: ActivatedRoute) { }

  saveRFP(): void {
    if (this.editMode) {
      this.rfpService.updateRFP(this.rfp, this.rfp).then(() => {
        console.log('Updated RFP');
      });
    } else {
      this.rfpService.createRFP(this.rfp).then(() => {
        console.log('Created new RFP');
      });
    }
  }

  newRFP(): void {
    this.rfp = new RFP();
  }

  // Used for creating a new RFP
  generatePDF(rfp: RFP) {
    if (rfp.projectTitle, rfp.contactName, rfp.organization, rfp.contactEmail, rfp.contactPhone,
      rfp.mailingAddress, rfp.problem, rfp.idealSituation, rfp.specifySpecificSoftware, rfp.specifyOtherReporting,
      rfp.specifyBudget, rfp.specifyUsabilityConsiderations, rfp.kindOfTests, rfp.sampleData) {
      
      // set the RFP's client to the currently logged-in user
      rfp.client = localStorage.getItem('uid');
      
      console.log('in');
      const docDefinition = this.rfpService.getDocumentDefinition(rfp);
      pdfMake.createPdf(docDefinition).open();

      this.saveRFP();
      alert('RFP submitted successfully');
      
    } else {
      alert('Please fill all of the required fields');
    }
  }
}
