import { Component, OnInit } from '@angular/core';

import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "student")) {
      window.location.href = "/";
    }
  }

  getProjects(): Project[] {
    return this.projectService.getProjects();
  }

  getPastProjects(): Project[] {
    return this.projectService.getProjects().filter((project, index, array) => {
      return project.status == 'Completed';
    });
  }
}
