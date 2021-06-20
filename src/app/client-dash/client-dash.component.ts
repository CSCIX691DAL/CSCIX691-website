import { Component, OnInit } from '@angular/core';
import RFP from '../rfp/rfp.model';
import { RfpService } from '../service/rfp.service';
import { TestimonialService } from '../service/testimonial_client.service';
import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';
import Testimonial from './testimonial.model';

@Component({
  selector: 'app-client-dash',
  templateUrl: './client-dash.component.html',
  styleUrls: ['./client-dash.component.css']
})
export class ClientDashComponent implements OnInit {
  constructor(private rfpService: RfpService, private projectService: ProjectService,
              private testimonial: TestimonialService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "client")) {
      window.location.href = "/";
    }
  }

  getRFPs(): RFP[] {
    return this.rfpService.getRFPs();
  }

  getProjects(): Project[] {
    return this.projectService.getProjects();
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
}
