import { ProjectService } from './../service/project.service';
import {Component, OnInit} from '@angular/core';
import {ThrowStmt} from '@angular/compiler';
import {FirebaseService} from '../service/users.service';
import {RfpService} from '../service/rfp.service';
import {AnnouncementService} from '../service/announcement.service';
import Announcement from "../admin-dash/announcement.model"
import {AuthService} from '../service/auth.service';
import {NgxCsvParser} from 'ngx-csv-parser';
import {NgxCSVParserError} from 'ngx-csv-parser';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import RFP from '../rfp/rfp.model';
import Project from '../projects/project.model';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  actUsers: Object[];
  inactUsers: Object[];
  showConfirm: boolean = false;
  studentRecords: any[] = [];

  constructor(private firebaseService: FirebaseService,
              private authService: AuthService,
              private ngxCsvParser: NgxCsvParser,
              private rfpService: RfpService,
              private projectService: ProjectService, 
              private announcementService: AnnouncementService) {
    this.actUsers = [];
    this.inactUsers = [];
  }

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "admin")) {
      window.location.href = "/";
    }

    this.getActiveUsersFromDB();
    this.getInactiveUsersFromDB();

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  // returns a list of pending RFPs
  getPendingRFPs(): RFP[] {
    return this.rfpService.getRFPs().filter((rfp, index, array) => {
      return rfp.status == 'Pending';
    });
  }

  // Returns a list of projects with status 'Active'
  getActiveProjects(): Project[] {
    return this.projectService.getProjects().filter((project, index, array) => {
      return project.status == 'Active';
    })
  }

  getActiveUsersFromDB() {

    this.firebaseService.getUsers().then((values) => {
      values.forEach((value) => {
        let userInfo = value.toJSON();
        if (userInfo['active'] === true) {
          this.actUsers.push(value.toJSON());
        }


      });
    });
  }

  getInactiveUsersFromDB() {

    this.firebaseService.getUsers().then((values) => {
      values.forEach((value) => {
        let userInfo1 = value.toJSON();
        if (userInfo1['active'] === false) {
          this.inactUsers.push(value.toJSON());
        }
      });
    });
  }

  showConfirmButton() {
    this.showConfirm = !this.showConfirm;
  }

  public changeListener(files: FileList) {
    this.studentRecords = [];
    console.log(files);
    if (files && files.length > 0) {
      this.ngxCsvParser.parse(files[0], {header: true, delimiter: ','})
        .pipe().subscribe((result: Array<any>) => {
        console.log('Result', result);
        this.studentRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    }
  }

  async batchCreateStudents() {
    for (let student of this.studentRecords) {
      let studentId = student['OrgDefinedId'].split('#')[1];
      await this.authService.signupStudent(student['Email'], studentId, student['First Name'], student['Last Name'], studentId);
      console.log(student);
    }
    this.studentRecords = [];
    this.showConfirm = false;
    this.ngOnInit();
  }

  generatePDF(rfp: RFP): void {
    const docDefinition = this.rfpService.getDocumentDefinition(rfp);
    pdfMake.createPdf(docDefinition).open();
  }

  // Set an RFP's status to approved and make it a project
  ApproveRFP(rfp: RFP): void {
    // approve RFP
    this.rfpService.updateRFP(rfp, {status: 'Approved'});
    // create project out of RFP
    this.projectService.createProject(rfp);
  }

  // Set an RFP's status to rejected
  RejectRFP(rfp: RFP): void {
    this.rfpService.updateRFP(rfp, {status: 'Rejected'});
  }

  toggleEditLinkTextbox(index: number): void {
    let editSection = <HTMLElement>document.getElementsByClassName("editLink").item(index);
    let viewSection = <HTMLElement>document.getElementsByClassName("viewLink").item(index);

    // if the edit section is hidden
    if (editSection.style.display == 'none') {
      // show the edit section
      editSection.style.display = 'block';
      // hide the link
      viewSection.style.display = 'none';
    } else {
      // hide the edit section
      editSection.style.display = 'none';
      // show the link
      viewSection.style.display = 'block';
      // reset the textbox's value
      (<HTMLInputElement>document.getElementsByClassName("editLinkTextbox").item(index)).value = '';
    }
  }

  editAzureLink(index: number, project: Project): void {
    // get new link from textbox
    let newLink = (<HTMLInputElement>document.getElementsByClassName("editLinkTextbox").item(index)).value;

    if (newLink != '') {
      // update the project
      this.projectService.updateProject(project, {azureLink: newLink});
    }

    // hide the edit section
    this.toggleEditLinkTextbox(index);
  }
  
  CreateAnnouncement() {

    let test = new Announcement();
    test.title = (<HTMLInputElement>document.getElementById("announcementTitle")).value;
    test.desc = (<HTMLInputElement>document.getElementById("announcementDesc")).value;
    test.date = Date();

    if(test.title == "" || test.desc == ""){
      window.alert("Please fill out all sections");
    }
    else{
      this.announcementService.pushAnnouncement(test);

      window.alert("Your announcement has been created");
    }
  
  }

}
