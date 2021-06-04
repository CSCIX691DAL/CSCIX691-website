import {Component, OnInit} from '@angular/core';
import {ThrowStmt} from '@angular/compiler';
import {FirebaseService} from '../service/users.service';
import {RfpService} from '../service/rfp.service';
import {AuthService} from '../service/auth.service';
import {NgxCsvParser} from 'ngx-csv-parser';
import {NgxCSVParserError} from 'ngx-csv-parser';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { importType } from '@angular/compiler/src/output/output_ast';
import { PopoutWindowModule } from 'angular-popout-window';
import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  actUsers: Object[];
  inactUsers: Object[];
  activeRFPs: Object[];
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  showConfirm: boolean = false;
  studentRecords: any[] = [];

  constructor(private firebaseService: FirebaseService,
              private authService: AuthService,
              private ngxCsvParser: NgxCsvParser,
              private rfpService: RfpService,
              public dialog: MatDialog) {
    this.actUsers = [];
    this.inactUsers = [];
    this.activeRFPs = [];
  }

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "admin")) {
      window.location.href = "/";
    }

    this.getActiveUsersFromDB();
    this.getInactiveUsersFromDB();
    this.getRFPFromDB();
    console.log(this.activeRFPs);
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

  getRFPFromDB() {
    this.rfpService.getRFPs().then((values) => {
      values.forEach((value) => {
        this.activeRFPs.push(value.toJSON());
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

  generatePDF(rfp: Object) {
    const docDefinition = {
      content: [
        {text: 'Project title: ' + rfp['projectTitle'] + '\n\n', fontSize: 32},
        {
          ul: [
            'Contact Name: ' + rfp['contactName'] + '\n\n',
            'Organization: ' + rfp['organization'] + '\n\n',
            'Contact Email:' + rfp['contactEmail'] + '\n\n',
            'Mailing Address: ' + rfp['mailingAddress'] + '\n\n\n'
          ]
        },
        {text: 'Briefly describe the organization, including its mission or primary function(s)\n\n', style: 'header'},
        {
          ul: [
            rfp['problem'] + '\n\n'
          ]
        },
        {text: 'Describe the ideal situation if this problem were solved in the best possible way (whatever that might be)' + '\n\n', style: 'header'},
        {
          ul: [
            'Ideal Situation: ' + rfp['idealSituation'] + '\n\n',
            'Specific Software: ' + rfp['specifySpecificSoftware'] + '\n\n',
            'Specific and detailed reporting: ' + rfp['specifyOtherReporting'] + '\n\n',
            'Budget: ' + rfp['specifyBudget'] + '\n\n',
            'Usability Considerations: ' + rfp['specifyUsabilityConsiderations'] + '\n\n',

          ]
        },
      ]
    };

    pdfMake.createPdf(docDefinition).open();
  }

  ApproveRFP(rfp: Object) {
    this.rfpService.ApproveRFP({rfp: rfp});
  }

  RejectRFP(rfp: Object) {
    this.rfpService.DenyRFP(rfp);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);//didn't know what is link for this 

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
  @Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'admin-dash-window.compont.html',
  })
  export class DialogContentExampleDialog {}//this function is link of window.html page to pop out the case

