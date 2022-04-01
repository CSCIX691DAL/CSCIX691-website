import { RfpService } from './../service/rfp.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from './rfp.model';
import { ActivatedRoute } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';



@Component({
  selector: 'app-rfp',
  templateUrl: './rfp.component.html',
  styleUrls: ['./rfp.component.css'],
})


export class RfpComponent implements OnInit {

  @ViewChild('form') form;
  rfp: RFP;
  id: string | undefined;
  editMode: boolean;
  submissionForm: Object;

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

    // get submission form template from database
    this.submissionForm = this.rfpService.getSubmissionForm();

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
    if (this.form.valid) {
      // set the RFP's client to the currently logged-in user
      rfp.client = localStorage.getItem('uid');
      const docDefinition = this.rfpService.getDocumentDefinition(rfp);
      pdfMake.createPdf(docDefinition).open();
      // save RFP to the database
      this.saveRFP();
      alert('RFP submitted successfully');

      // route user back to the dashboard
      window.location.href = "/client-dashboard";
    } else {
      alert('Please fill all of the required fields');
    }
  }

  handleClick(evt) {
    
    const content = evt.target.nextElementSibling
    
    if (!evt.target.parentNode.classList.contains('open')) {
        content.style.height = `${content.scrollHeight}px`
        // document.getElementById('mainQ1').setAttribute('style', 'height:200px;')
        // content.style.marginTop = '0px'
        evt.target.parentNode.classList.add('open')
    } else {
        content.style.height = `0px`
        // content.style.marginTop = '0px'
        evt.target.parentNode.classList.remove('open') } 
  }

}

//  - (content.scrollHeight)/4
