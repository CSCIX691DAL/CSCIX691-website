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
  styleUrls: ['./client-dash.component.css'],
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class ClientDashComponent implements OnInit {

  constructor(private rfpService: RfpService, private projectService: ProjectService,
              private testimonial: TestimonialService) { }

  clientID: string;
  selected = 0;
  hovered = 0;
  readonly = false;
  

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "client")) {
      window.location.href = "/";
    }

    this.clientID = localStorage['uid']; // get id of currently logged-in client
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

  CreateTestimonial() {

    let newTestimonial = new Testimonial();
    newTestimonial.client_designation = (<HTMLInputElement>document.getElementById("testimonialTitle")).value;
    newTestimonial.testimonial_text = (<HTMLInputElement>document.getElementById("testimonialDesc")).value;
    newTestimonial.rating = this.selected.toString();
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
