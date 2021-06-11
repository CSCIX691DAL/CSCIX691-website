import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import Questionnaire from './student-questionnaire.model';
@Component({
  selector: 'app-student-questionnaire',
  templateUrl: './student-questionnaire.component.html',
  styleUrls: ['./student-questionnaire.component.css']
})
export class StudentQuestionnaireComponent implements OnInit {
  
  
  leader: string = ''; 
  pastCourses: string = ''; 
  studentRep: string = ''; 
  ipNDA: string = ''; 
  pastRemote: string = ''; 
  acc: string = '';  
  pastReality: string = ''; 
  
  pastAgileSoft: string = ''; 
  pastGitEX: string = ''; 
  pastAgileScrum: string = ''; 
  pastAngular: string = ''; 
  pastReact: string = ''; 
  pastNext: string = ''; 
  pastFlutter: string = ''; 
  pastFirebase: string = ''; 
  pastAzure: string = ''; 
  pastAEM: string = ''; 
  pastHTMLCSS: string = ''; 
  pastPHP: string = ''; 
  pastWire: string = '';
  pastAnimation: string = '';
  constructor(private db: AngularFireDatabase, private projectService: ProjectService) { }

  ngOnInit(): void {
  }
  pastRealityCheck (event: any){
    this.pastReality = event.target.value;
  }
  leaderCheck (event: any){
    this.leader = event.target.value;
  }
  pastCoursesCheck (event: any){
    this.pastCourses = event.target.value;
  }
  studentRepCheck (event: any){
    this.studentRep = event.target.value;
  }
  ipNDACheck (event: any){
    this.ipNDA = event.target.value;
  }
  pastRemoteCheck (event: any){
    this.pastRemote = event.target.value;
  }
  accCheck (event: any){
    this.acc = event.target.value;
  }
  pastAgileSoftCheck (event: any){
    this.pastAgileSoft = event.target.value;
  }
  pastGitEXCheck (event: any){
    this.pastGitEX = event.target.value;
  }
  pastAgileScrumCheck (event: any){
    this.pastAgileScrum = event.target.value;
  }
  pastAngularCheck (event: any){
    this.pastAngular = event.target.value;
  }
  pastReactCheck (event: any){
    this.pastReact = event.target.value;
  }
  pastNextCheck (event: any){
    this.pastNext = event.target.value;
  }
  pastFlutterCheck (event: any){
    this.pastFlutter = event.target.value;
  }
  pastFirebaseCheck (event: any){
    this.pastFirebase = event.target.value;
  }
  pastAzureCheck (event: any){
    this.pastAzure = event.target.value;
  }
  pastAEMCheck (event: any){
    this.pastAEM = event.target.value;
  }
  pastHTMLCSSCheck (event: any){
    this.pastHTMLCSS = event.target.value;
  }
  pastPHPCheck (event: any){
    this.pastPHP = event.target.value;
  }
  pastWireCheck (event: any){
    this.pastWire = event.target.value;
  }
  pastAnimationCheck (event: any){
    this.pastAnimation = event.target.value;
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
    var improve = (<HTMLInputElement>document.getElementById("improve")).value;
    var timeZone = (<HTMLInputElement>document.getElementById("timeZone")).value;
    var backgroundEX = (<HTMLInputElement>document.getElementById("backgroundEX")).value;
    var operatingSystem = (<HTMLInputElement>document.getElementById("operatingSystem")).value;


    let questionnaire = new Questionnaire();
    questionnaire.familyName = String(familyName);
    questionnaire.firstName = String(firstName);
    questionnaire.b00 = String(b00);
    questionnaire.course = String(course);
    questionnaire.projectChoice1 = String(projectChoice1);
    questionnaire.projectChoice2 = String(projectChoice2);
    questionnaire.projectChoice3 = String(projectChoice3);
    questionnaire.leader = String(this.leader);
    questionnaire.pastCourses = String(this.pastCourses);   
    questionnaire.ipNDA = String(this.ipNDA); 
    questionnaire.pastRemote = String(this.pastRemote);
    questionnaire.improve = String(improve);
    questionnaire.studentRep = String(this.studentRep);
    questionnaire.acc = String(this.acc);


    questionnaire.operatingSystem = String(operatingSystem);
    questionnaire.backgroundEX = String(backgroundEX);
    questionnaire.pastAgileSoft = String(this.pastAgileSoft);
    questionnaire.pastGitEX = String(this.pastGitEX);
    questionnaire.pastAgileScrum = String(this.pastAgileScrum);
    questionnaire.pastAngular = String(this.pastAngular);
    questionnaire.pastReact = String(this.pastReact);
    questionnaire.pastNext = String(this.pastNext);
    questionnaire.pastFlutter = String(this.pastFlutter);   
    questionnaire.pastFirebase = String(this.pastFirebase); 
    questionnaire.pastAzure = String(this.pastAzure);
    questionnaire.pastAEM = String(this.pastAEM);
    questionnaire.pastHTMLCSS = String(this.pastHTMLCSS);
    questionnaire.pastPHP = String(this.pastPHP);
    questionnaire.pastWire = String(this.pastWire);
    questionnaire.pastAnimation = String(this.pastAnimation);   
    questionnaire.pastReality = String(this.pastReality); 
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
