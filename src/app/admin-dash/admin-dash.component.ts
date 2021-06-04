import { ProjectService } from './../service/project.service';
import {Component, OnInit} from '@angular/core';
import {ThrowStmt} from '@angular/compiler';
import {FirebaseService} from '../service/users.service';
import {RfpService} from '../service/rfp.service';
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
              private projectService: ProjectService) {
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
}
