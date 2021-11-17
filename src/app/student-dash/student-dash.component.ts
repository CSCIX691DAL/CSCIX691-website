import { Component, OnInit } from '@angular/core';

import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from '../service/team.service';
import { AngularFireDatabase } from '@angular/fire/database';
import DueDates from '../dueDates/dueDates.model';
import { dueDateService } from '../service/duedate.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {
  uid: string;

  constructor(private projectService: ProjectService, private duedateService: dueDateService, private teamService: TeamService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "student")) {
      window.location.href = "/";
    }

    this.uid = localStorage['uid']; // get id of currently logged-in student
  }

  getProjects(): Project[] {
    return this.projectService.getProjects();
  }

  getMyPastProjects(): Project[] {
    return this.projectService.getProjectsByUID(this.uid).filter((project, index, array) => {
      return project.status == 'Completed';
    });
  }

  getMyActiveProjects(): Project[] {
    return this.projectService.getProjectsByUID(this.uid).filter((project, index, array) => {
      return project.status == 'Active';
    });
  }

  getActiveProjects(): Project[] {
    return this.projectService.getProjects().filter((project, index, array) => {
      return project.status == 'Active';
    });
  }

  getDueDates(): DueDates[] {
    return this.duedateService.getdueDates();
  }

  getTeamFeedback(){
    return this.teamService.getTeamFeedback();
  }
  
}
