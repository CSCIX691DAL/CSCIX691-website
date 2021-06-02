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
  constructor(private rfpService: RfpService, private projectService: ProjectService) { }

  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

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
}
