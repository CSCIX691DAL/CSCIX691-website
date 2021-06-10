import { Component, OnInit } from '@angular/core';

import {RfpService} from '../service/rfp.service';
import {AuthService} from '../service/auth.service';
import {NgxCsvParser} from 'ngx-csv-parser';

import {FirebaseService} from '../service/admin-teams.service';
import Team from '../admin-create-teams/admin-team.model';


@Component({
  selector: 'app-admin-edit-teams',
  templateUrl: './admin-edit-teams.component.html',
  styleUrls: ['./admin-edit-teams.component.css']
})
export class AdminEditTeamsComponent implements OnInit {
  team: Object[];
  actUsers: Object[];
  inactUsers: Object[];

  
constructor(private firebaseService: FirebaseService,
) {
    this.actUsers = [];
    this.inactUsers = [];
    this.team = [];
}

ngOnInit(): void {
  this.getStudentTeams();
}

getStudentTeams() {
  this.firebaseService.getTeams().then((values) => {
    values.forEach((value) => {
        this.team.push(value.toJSON());
    
    });
  });
}
}
