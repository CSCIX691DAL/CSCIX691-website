import { Component, OnInit } from '@angular/core';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from './../service/team.service';
import { Student } from '../user/student.model';
import { User } from '../user/user.model';
import { UserService } from './../service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import Team from '../team/team.model';

@Component({
  selector: 'app-admin-create-teams',
  templateUrl: './admin-create-teams.component.html',
  styleUrls: ['./admin-create-teams.component.css']
})
export class AdminCreateTeamsComponent implements OnInit {
  teamMembers=[];
  constructor(private TeamService: TeamService,
    private userService: UserService
    ) { }

  ngOnInit(): void {

  }
  getTeams(): Team[] {
    return Object.values(this.TeamService.getTeams());
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

  //Returns a list of Active Students
  getActiveStudentsFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {
      
      return user.active && this.userService.isStudent(user)&& (<Student>user).team == undefined
    });
  }
  
  getTeamMembers(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {
      var teamName = (<HTMLInputElement>document.getElementById("teams")).value;
      return user.active && this.userService.isStudent(user)&& (<Student>user).team == teamName
    });
  }
    
}

