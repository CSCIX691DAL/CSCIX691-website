import { Component, OnInit } from '@angular/core';
import RFP from '../rfp/rfp.model';
import { RfpService } from '../service/rfp.service';

import Project from '../projects/project.model';
import { ProjectService } from '../service/project.service';


@Component({
  selector: 'app-client-dash',
  templateUrl: './client-dash.component.html',
  styleUrls: ['./client-dash.component.css']
})
export class ClientDashComponent implements OnInit {
  clientID: string;

  constructor(private rfpService: RfpService, private projectService: ProjectService) { }

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
}
