import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Team from './admin-team.model';

@Component({
  selector: 'app-admin-create-teams',
  templateUrl: './admin-create-teams.component.html',
  styleUrls: ['./admin-create-teams.component.css']
})  
export class AdminCreateTeamsComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    
  }
  makeTeam(Group: Object){
    this.db.database.ref('StudentGroups').push(Group);
  }
  createGroup(){
    var x = (<HTMLInputElement>document.getElementById("groupName")).value;
    var y = (<HTMLInputElement>document.getElementById("memberName")).value;
    let test = new Team();
    test.groupName = String(x);
    test.member = String(y);

    if(test.groupName == "" || test.member == ""){
      window.alert("Please fill out all sections");
    }
    else{
      this.makeTeam(test);
      window.alert("The group has been created");
    }

    }
}


