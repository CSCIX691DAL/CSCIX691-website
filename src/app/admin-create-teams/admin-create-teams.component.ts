import { Component, OnInit } from '@angular/core';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from './../service/team.service';
import { Student } from '../user/student.model';
import { User } from '../user/user.model';
import { UserService } from './../service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import Team from '../team/team.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { element } from 'protractor';



@Component({
  selector: 'app-admin-create-teams',
  templateUrl: './admin-create-teams.component.html',
  styleUrls: ['./admin-create-teams.component.css']
})
export class AdminCreateTeamsComponent implements OnInit {

  constructor(private TeamService: TeamService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  changeLabelName(lbl, val) {
    document.getElementById(lbl).innerHTML = val;
  } 
  getTeams(): Team[] {
    return Object.values(this.TeamService.getTeams());
  }
  getSingleTeam():Team{
    var projectChoice1 = (<HTMLInputElement>document.getElementById("projectChoice1")).value;
    

    //var team = angular.element(element).parent().attr('value')
    return this.TeamService.getTeamByName(String(projectChoice1))
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
    if(event.container.id=='projectChoice1'){
        this.addToTeam;
        var teams = document.getElementById('value');
        var teamsText =  teams.textContent;
      }
   }
  }
  addToTeam(student):void{
    this.addToTeam(student);
  }
 
  //Returns a list of Active Students
  getActiveStudentsFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {
      return user.active && this.userService.isStudent(user)&& (<Student>user).team == undefined
    });
  }
   //Returns a list of members in a team
   //getTeamMembersFromDB(): Team[] {
    //return this.TeamService.getTeamByKey().filter((user, index, array) => {
      
     // return user.active && this.userService.isStudent(user)&& (<Student>user).team == undefined
    //});
  //}
  getTeamMembers(team: Team) {
    let teamMembers = [];
    for(let uid of Object.keys(team.members)) {
      teamMembers.push(this.userService.getUserById(uid));
    }
    return teamMembers;
  }
}

