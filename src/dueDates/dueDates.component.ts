import { Component, OnInit } from '@angular/core';
import dueDates from './dueDates.model';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
    selector: 'app-dueDates',
    templateUrl: './dueDates.component.html',
    styleUrls: ['./dueDates.component.css']
  })
export class StudentDashComponent implements OnInit {
    uid: string;
    constructor(private db: AngularFireDatabase) { }


ngOnInit(): void {
if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "student")) {
  window.location.href = "/";
}

this.uid = localStorage['uid']; // get id of currently logged-in student
}

makeTeam(dueDates: Object){
  this.db.database.ref('DueDates').push(dueDates);
}

dueDates(){
let dueDate = new dueDates();
    dueDate.title = "test";
    dueDate.date = "date";
    this.makeTeam(dueDate);
}

}