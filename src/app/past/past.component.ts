import { ProjectService } from './../service/project.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Project from '../projects/project.model';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css'],
})
export class PastComponent implements OnInit {
  hide=[];

  showDiv = {
    fall: true,
    summer: true,
  };

  constructor(private projectsService: ProjectService) { }

  ngOnInit(): void { }

  // gets completed projects from the database
  getPastProjects(): Project[] {
    // get projects from the database
    let projects = this.projectsService.getProjects();
    // filter out any incomplete projects
    projects.filter((project, index, array) => {
      return project.status == 'Completed';
    });
    return projects;
  }
}
