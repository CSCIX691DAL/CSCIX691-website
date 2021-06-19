import { Component, OnInit } from '@angular/core';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-create-teams',
  templateUrl: './admin-create-teams.component.html',
  styleUrls: ['./admin-create-teams.component.css']
})
export class AdminCreateTeamsComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }
  getProjects(): Project[] {
    return this.projectService.getProjects();
  }



  changeDragDropTable(event: CdkDragDrop<string[]>) {//Code taken from https://medium.com/codetobe/learn-how-to-drag-drop-items-in-angular-7-20395c262ab0
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } 
    else {
    transferArrayItem(event.previousContainer.data,
    event.container.data,
    event.previousIndex, event.currentIndex);
   }
  }


  activeStudents = [
    {
      name: 'Michael Brian',
    },
    {
      name: 'Emily Jane',
    },
    {
      name: 'Jasper Cools',
    },
    {
      name: 'Ty MacDonald',
    }
  ];

  projectGroups = [
    {
      name: 'Rob Doe',
    },
    {
      name: 'Ben Mike',
    },

  ];
}

