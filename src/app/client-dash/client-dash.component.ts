import { Component, OnInit } from '@angular/core';
import RFP from '../rfp/rfp.model';
import { RfpService } from '../service/rfp.service';
import { TestimonialService } from '../service/testimonial_client.service';
import { FeedBacklService } from '../service/feedback.service';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import { TeamService } from '../service/team.service';
import Testimonial from './testimonial.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Feedback from './clientFeedback.model';
import Team from '../team/team.model';

@Component({
  selector: 'app-client-dash',
  templateUrl: './client-dash.component.html',
  styleUrls: ['./client-dash.component.css']
})
export class ClientDashComponent implements OnInit {

  

  constructor(private rfpService: RfpService, private projectService: ProjectService,
              private testimonial: TestimonialService,
              private feedback: FeedBacklService,
              private teamService: TeamService ) { }

  clientID: string;
  feedbackTeam: string = '';

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "client")) {
      window.location.href = "/";
    }

    this.clientID = localStorage['uid']; // get id of currently logged-in client
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  getFeedbackTeam (event: any){
    this.feedbackTeam = event;
  }

  getMyRFPs(): RFP[] {
    return this.rfpService.getRFPs().filter((rfp, index, array) => {
      return rfp.client == this.clientID;
    });
  }

  getMyProjects(): Project[] {
    return this.projectService.getProjects().filter((project, index, array) => {
      return project.client == this.clientID;
    });
  }
  //Method for getting the teams assined to projects of the logged in client
  //TODO: Currently project keys are not saved with teams on creation. This needs to be added to teams on creation. 
  //The project keys currently in the database were added for testing
  getMyTeams(): Team[] {
    //Getting projects assoiated with client
    let projects = this.projectService.getProjects().filter((project, index, array) => {
      return project.client == this.clientID;
    });
    //Getting teams assoiated with the clients projects
    let teams = [];
    for(let x = 0; x < projects.length; x++){
      Object.values(this.teamService.getTeams()).filter((team, index, array) => {
        if(team.project == projects[x].key){
          teams.push(team);
        }
      });
    }

    return teams;
  }

  generatePDF(rfp: RFP): void {
    const docDefinition = this.rfpService.getDocumentDefinition(rfp);
    pdfMake.createPdf(docDefinition).open();
  }

  CreateTestimonial() {

    let newTestimonial = new Testimonial();
    newTestimonial.client_designation = (<HTMLInputElement>document.getElementById("testimonialTitle")).value;
    newTestimonial.testimonial_text = (<HTMLInputElement>document.getElementById("testimonialDesc")).value;
    newTestimonial.rating = (<HTMLInputElement>document.getElementById("testimonialRating")).value;
    newTestimonial.client_name = localStorage.getItem("name");
    newTestimonial.company_name = localStorage.getItem("org");// there have a issue
  
    if(newTestimonial.client_designation == "" ||newTestimonial.testimonial_text  == "" || newTestimonial.rating =="" ){
      window.alert("Please fill out all sections");
    }
    else{
      this.testimonial.createTestimonial(newTestimonial);

      window.alert("Your testimonial has been created");
    }
  
  }
  
  CreateFeedback() {

    let newFeedback= new Feedback();
    newFeedback.title = (<HTMLInputElement>document.getElementById("feedbackTitle")).value;
    newFeedback.client = localStorage.getItem('uid');
    newFeedback.date = Date();
    newFeedback.body= (<HTMLInputElement>document.getElementById("feedbackBody")).value;

    if(newFeedback.title == "" || newFeedback.date  == "" ||newFeedback.body  == ""  ){
      window.alert("Please fill out all sections");
    }
    else{
      // feedback --> Start here 
      this.teamService.addTeamFeedback(newFeedback, this.feedbackTeam);

    }
  
  }
}
