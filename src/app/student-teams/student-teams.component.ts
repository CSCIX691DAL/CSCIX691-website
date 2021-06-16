import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service'
import {RfpService} from '../service/rfp.service';
import {AuthService} from '../service/auth.service';
import {NgxCsvParser} from 'ngx-csv-parser';
import { User } from '../user/user.model';
import {UserType} from '../user/user.model';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'student-teams',
  templateUrl: 'student-teams.component.html',
  styleUrls: ['student-teams.component.css']
})
export class StudentTeamsComponent implements OnInit {
  studentTeams: Object [];
  actStudents: Object[];
  constructor(private UserService: UserService,
    private authService: AuthService,
    private ngxCsvParser: NgxCsvParser,
    private rfpService: RfpService) {
   this.actStudents = [];
   this.studentTeams = [];
}

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "admin")) {
      window.location.href = "/";
    }
  this.getStudentTeam();
  this.getActiveStudentsFromDB();
}
getActiveStudentsFromDB() {
  return this.UserService.getUsers().filter((user,index,array)=>{
    return user.active && user.userType==UserType.Student;
  })
}
getStudentTeam(){  }

selectTeam(){
  var val = (document.getElementById("selectDropdown")as HTMLSelectElement).value
  if(val){
    
  }
}
}
