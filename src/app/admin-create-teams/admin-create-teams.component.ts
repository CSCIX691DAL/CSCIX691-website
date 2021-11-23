import {Component, OnInit} from '@angular/core';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from '../service/team.service';
import { Student } from '../user/student.model';
import { User } from '../user/user.model';
import { UserService } from '../service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import Team from '../team/team.model';
import DueDate from '../dueDates/dueDates.model';
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
  teamMembers = [];

  // tslint:disable-next-line:no-shadowed-variable
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
        // tslint:disable-next-line:triple-equals
        return quest.userID != '';
      });
    }

    generatePDF(quest: Questionnaire): void {
      const docDefinition = this.questService.getDocumentDefinition(quest);
      pdfMake.createPdf(docDefinition).open();
    }



  // this method is intended to return either null or the teams Id to prevent the teams dropdown from resetting after student is added
  // tslint:disable-next-line:typedef
  dropDownFix(team){
    if (!team) { return null; }
    return team.our_team_id;
  }

  changeDragDropTable(event: CdkDragDrop<string[]>) {// Code created using https://medium.com/codetobe/learn-how-to-drag-drop-items-in-angular-7-20395c262ab0
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
      // tslint:disable-next-line:no-unused-expression
        event.container.data;

    }
    else {
    transferArrayItem(event.previousContainer.data,
    event.container.data,
    event.previousIndex, event.currentIndex);
      // tslint:disable-next-line:triple-equals
    if (event.container.id == 'cdk-drop-list-1'){
      // get the key of the team to add student to
      const teamKey = (document.getElementById('teams') as HTMLInputElement).value;
      // get the student being added
      const studentString = JSON.stringify(event.container.data[event.currentIndex]);
      const student = JSON.parse(studentString);
      // add the student to the team
      this.TeamService.addStudentToTeam(this.TeamService.getTeamByKey(teamKey), student);
    }
      // tslint:disable-next-line:triple-equals
    if (event.container.id == 'cdk-drop-list-0'){
      const teamName = (document.getElementById('teams') as HTMLInputElement).value;
      const studentString = JSON.stringify(event.container.data[event.currentIndex]);
      const student = JSON.parse(studentString);
      this.TeamService.removeStudentFromTeam(this.TeamService.getTeamByKey(teamName), student);

    }

   }
  }



  // Returns a list of Active Students
  getActiveandAvailableStudentsFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {

      // tslint:disable-next-line:triple-equals
      return user.active && this.userService.isStudent(user) && (user as Student).team == undefined;
    });
  }


  getActiveStudentsFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {

      return user.active && this.userService.isStudent(user);
    });
  }


  getAllStudentsFromDB(): User[]{
    return this.userService.getUsers().filter((user, index, array) => {
      return this.userService.isStudent(user);
    });
  }


  getQuestionnaireFromKey(stringy: string): Questionnaire[] {
    return this.questService.getQuest().filter((quest, index, array) => {
      // tslint:disable-next-line:triple-equals
      return quest.b00 == stringy;
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
    getTeamName(Student: User): string {
  // if the user is a student and is on a team
  if (Student.team) {
    // get the team from the database
    const team = this.TeamService.getTeamByKey(Student.team);

    // if the team exists
    if (team) {
      return team.name;
    }
  }

  return 'None';
}

// On-change listener for the Teams drop-down
  // tslint:disable-next-line:typedef
  getTeamMembers(teamKey: string) {
    // if no team is selected
    if (teamKey === 'default') {
      this.teamMembers = [];
    }
    // if a team is selected
    else {
      this.teamMembers = this.userService.getUsers().filter((user, index, array) => {
        // tslint:disable-next-line:triple-equals
        return user.active && this.userService.isStudent(user) && (user as Student).team == teamKey;
      });
    }
  }

  dueDates() {
    //to be implemented
  }
}


