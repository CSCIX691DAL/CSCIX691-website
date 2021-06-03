import { Component, OnInit } from '@angular/core';
import {ThrowStmt} from '@angular/compiler';
import {FirebaseService} from '../service/users.service';
import {RfpService} from '../service/rfp.service';
import {AuthService} from '../service/auth.service';
import {NgxCsvParser} from 'ngx-csv-parser';
import {NgxCSVParserError} from 'ngx-csv-parser';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-active-students-page',
  templateUrl: './active-students-page.component.html',
  styleUrls: ['./active-students-page.component.css']
})
export class ActiveStudentsPageComponent implements OnInit {
  
  actStudents: Object[];
  constructor(private firebaseService: FirebaseService,
    private authService: AuthService,
    private ngxCsvParser: NgxCsvParser,
    private rfpService: RfpService) {
   this.actStudents = [];
}

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "admin")) {
      window.location.href = "/";
    }
  
  this.getActiveStudentsFromDB();
}
getActiveStudentsFromDB() {

    this.firebaseService.getUsers().then((values) => {
      values.forEach((value) => {
        let userInfo = value.toJSON();
        if (userInfo['active'] === true&&userInfo['studentID']!=undefined) {
          this.actStudents.push(value.toJSON());
        }

      });
    });
  }
}
