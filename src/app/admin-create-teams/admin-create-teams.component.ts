import { Component, OnInit } from '@angular/core';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from './../service/team.service';
import { Student } from '../user/student.model';
import { User } from '../user/user.model';
import { UserService } from './../service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import Team from '../team/team.model';

import Questionnaire from '../student-questionnaire/student-questionnaire.model';
import {QuestionnaireService} from '../service/questionnaire.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';




@Component({
  selector: 'app-admin-create-teams',
  templateUrl: './admin-create-teams.component.html',
  styleUrls: ['./admin-create-teams.component.css']
})
export class AdminCreateTeamsComponent implements OnInit {
  teamMembers=[];


  constructor(private TeamService: TeamService,
    private userService: UserService,
    private questService: QuestionnaireService


    ) { }

  ngOnInit(): void {

  }

  getTeams(): Team[] {
    return Object.values(this.TeamService.getTeams());
  }


    // returns a list of pending RFPs
    getQuest(): Questionnaire[] {
      return this.questService.getQuest().filter((quest, index, array) => {
        return quest.userID != '';
      });
    }

    generatePDF(quest: Questionnaire): void {
      const docDefinition = this.questService.getDocumentDefinition(quest);
      pdfMake.createPdf(docDefinition).open();
    }

    

  //this method is intended to return either null or the teams Id to prevent the teams dropdown from resetting after student is added
  dropDownFix(team){
    if(!team) return null;
    return team.our_team_id;
  }


  changeDragDropTable(event: CdkDragDrop<string[]>) {//Code created using https://medium.com/codetobe/learn-how-to-drag-drop-items-in-angular-7-20395c262ab0
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
        event.container.data
       
    } 
    else {
    transferArrayItem(event.previousContainer.data,
    event.container.data,
    event.previousIndex, event.currentIndex);
    if(event.container.id=='cdk-drop-list-1'){
      // get the key of the team to add student to
      let teamKey = (<HTMLInputElement>document.getElementById("teams")).value;
      // get the student being added
      let studentString = JSON.stringify(event.container.data[event.currentIndex])
      let student = JSON.parse(studentString);
      // add the student to the team
      this.TeamService.addStudentToTeam(this.TeamService.getTeamByKey(teamKey), student)
    }
    if (event.container.id=='cdk-drop-list-0'){
      let teamName = (<HTMLInputElement>document.getElementById("teams")).value;
      let studentString = JSON.stringify(event.container.data[event.currentIndex])
      let student = JSON.parse(studentString);
      this.TeamService.removeStudentFromTeam(this.TeamService.getTeamByKey(teamName), student);
     
    }
  
   }
  }



  //Returns a list of Active Students
  getActiveStudentsFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {
      
      return user.active && this.userService.isStudent(user)&& (<Student>user).team == undefined
    });
  }


  getAllStudentsFromDB():User[]{
    return this.userService.getUsers().filter((user, index, array) => {
      return this.userService.isStudent(user)
    });

}   
 getTeamName(Student: Student): string {
  // if the user is a student and is on a team
  if (Student.team) {
    // get the team from the database
    let team = this.TeamService.getTeamByKey(Student.team);

    // if the team exists
    if (team) {
      return team.name;
    }
  }

  return 'None';
}




// On-change listener for the Teams drop-down
  getTeamMembers(teamKey: string) {
    // if no team is selected
    if (teamKey == 'default') {
      this.teamMembers = [];
    }
    // if a team is selected
    else {
      this.teamMembers = this.userService.getUsers().filter((user, index, array) => {
        return user.active && this.userService.isStudent(user) && (<Student>user).team == teamKey;
      });
    }
  }
}
    

