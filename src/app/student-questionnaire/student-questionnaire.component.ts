import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase-admin';
import * as angular from "angular";
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';

import * as $ from 'jquery';
import Questionnaire from './student-questionnaire.model';
@Component({
  selector: 'app-student-questionnaire',
  templateUrl: './student-questionnaire.component.html',
  styleUrls: ['./student-questionnaire.component.css']
})
export class StudentQuestionnaireComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private projectService: ProjectService) { }

  ngOnInit(): void {
  }


  makeTeam(Questionnaire: Object){
    this.db.database.ref('StudentQuestionnaire').push(Questionnaire);
  }


  getProjects(): Project[] {
    return this.projectService.getProjects();
  }

  addQuest(){
    var familyName = (<HTMLInputElement>document.getElementById("familyName")).value;
    var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    var b00 = (<HTMLInputElement>document.getElementById("b00")).value;
    var course = (<HTMLInputElement>document.getElementById("courses")).value;
    var projectChoice1 = (<HTMLInputElement>document.getElementById("projectChoice1")).value;
    var projectChoice2 = (<HTMLInputElement>document.getElementById("projectChoice2")).value;
    var projectChoice3 = (<HTMLInputElement>document.getElementById("projectChoice3")).value;
    var leader = ($('input[name=leader]:checked').val());
    var pastCourses = ($('input[name=pastCourses]:checked').val());
    var studentRep = ($('input[name=studentRep]:checked').val());
    var ipNDA = ($('input[name=ipNDA]:checked').val());
    var pastRemote= ($('input[name=pastRemote]:checked').val());
    var improve = (<HTMLInputElement>document.getElementById("improve")).value;
    var acc = ($('input[name=acc]:checked').val());

    var operatingSystem = (<HTMLInputElement>document.getElementById("operatingSystem")).value;
    var backgroundEX = (<HTMLInputElement>document.getElementById("backgroundEX")).value;
    var pastAgileSoft = ($('input[name=pastAgileSoft]:checked').val());
    var pastGitEX = ($('input[name=pastGitEX]:checked').val());
    var pastAgileScrum = ($('input[name=pastAgileScrum]:checked').val());
    var pastAngular = ($('input[name=pastAngular]:checked').val());
    var pastReact = ($('input[name=pastReact]:checked').val());
    var pastNext = ($('input[name=pastNext]:checked').val());
    var pastFlutter = ($('input[name=pastFlutter]:checked').val());
    var pastFirebase = ($('input[name=pastFirebase]:checked').val());
    var pastAzure = ($('input[name=pastAzure]:checked').val());
    var pastAEM = ($('input[name=pastAEM]:checked').val());
    var pastHTMLCSS = ($('input[name=pastHTMLCSS]:checked').val());
    var pastPHP = ($('input[name=pastPHP]:checked').val());
    var pastWire = ($('input[name=pastWire]:checked').val());
    var pastAnimation = ($('input[name=pastAnimation]:checked').val());
    var pastReality = ($('input[name=pastReality]:checked').val());
    var timeZone = (<HTMLInputElement>document.getElementById("timeZone")).value;

    let questionnaire = new Questionnaire();
    questionnaire.familyName = String(familyName);
    questionnaire.firstName = String(firstName);
    questionnaire.b00 = String(b00);
    questionnaire.course = String(course);
    questionnaire.projectChoice1 = String(projectChoice1);
    questionnaire.projectChoice2 = String(projectChoice2);
    questionnaire.projectChoice3 = String(projectChoice3);
    questionnaire.leader = String(leader);
    questionnaire.pastCourses = String(pastCourses);   
    questionnaire.ipNDA = String(ipNDA); 
    questionnaire.pastRemote = String(pastRemote);
    questionnaire.improve = String(improve);
    questionnaire.studentRep = String(studentRep);
    questionnaire.acc = String(acc);


    questionnaire.operatingSystem = String(operatingSystem);
    questionnaire.backgroundEX = String(backgroundEX);
    questionnaire.pastAgileSoft = String(pastAgileSoft);
    questionnaire.pastGitEX = String(pastGitEX);
    questionnaire.pastAgileScrum = String(pastAgileScrum);
    questionnaire.pastAngular = String(pastAngular);
    questionnaire.pastReact = String(pastReact);
    questionnaire.pastNext = String(pastNext);
    questionnaire.pastFlutter = String(pastFlutter);   
    questionnaire.pastFirebase = String(pastFirebase); 
    questionnaire.pastAzure = String(pastAzure);
    questionnaire.pastAEM = String(pastAEM);
    questionnaire.pastHTMLCSS = String(pastHTMLCSS);
    questionnaire.pastPHP = String(pastPHP);

    questionnaire.pastWire = String(pastWire);
    questionnaire.pastAnimation = String(pastAnimation);   
    questionnaire.pastReality = String(pastReality); 
    questionnaire.timeZone = String(timeZone); 


    if(questionnaire.familyName == "" || questionnaire.firstName == "" || questionnaire.b00 == "" || questionnaire.pastCourses == "undefined" 
    || questionnaire.leader == "undefined" || questionnaire.studentRep == "undefined" || questionnaire.ipNDA == "undefined" 
    || questionnaire.pastRemote == "undefined" || questionnaire.operatingSystem == "" || questionnaire.pastAgileSoft == "undefined"
    || questionnaire.pastGitEX == "undefined" || questionnaire.pastAgileScrum == "undefined" || questionnaire.pastAngular == "undefined" 
    || questionnaire.pastReact == "undefined" || questionnaire.pastNext == "undefined" || questionnaire.pastFlutter == "undefined"
    || questionnaire.pastFirebase == "undefined" || questionnaire.pastAzure== "undefined" || questionnaire.pastAEM == "undefined"
    || questionnaire.pastHTMLCSS == "undefined" || questionnaire.pastWire == "undefined" || questionnaire.pastAnimation == "undefined" 
    || questionnaire.pastReality == "undefined" || questionnaire.timeZone == ""){
    window.alert("Please fill out all required sections");
    }
    else{
      this.makeTeam(questionnaire);
      window.alert("Your questionnaire has been submitted");
    }
    
    
  }
}
