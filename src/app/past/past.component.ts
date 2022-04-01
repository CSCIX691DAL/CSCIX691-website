import { ProjectService } from './../service/project.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Project from '../projects/project.model';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css'],
})
export class PastComponent implements OnInit {
  hide=[];

  showDiv = {
    fall: false,
    summer: false,
    winter1: false,
    winter2: false,
  };

  constructor(private projectsService: ProjectService) { }

  ngOnInit(): void { }

  // gets completed projects from the database
  getPastProjects(): Project[] {
    // get projects from the database
    let projects = this.projectsService.getProjects();
    // filter out any incomplete projects
    projects.filter((project, index, array) => {
      return project.status == 'Completed';
    });
    return projects;
  }

  getValue(val:string){

    var count =0;

    const searchRes = [];

    let projects = this.projectsService.getProjects();

    projects.filter((project, index, array) => {

      if( 
        
        (project.term ==='Summer 2021' || project.term ==='Winter 2021' || project.term ==='Fall 2021'|| project.term ==='Winter 2022' ) &&
      ( (project.title.toLowerCase() ).includes(val.toLowerCase() ) || (project.client.toLowerCase() ).includes(val.toLowerCase() ) || 
      (project.descLong.toLowerCase() ).includes(val.toLowerCase() ) )
       )
       
       {

        searchRes.push(project);

        document.getElementById("outerSearch").style.cssText = "padding: 30px; width: 79%; margin: 10px auto";
        document.getElementById("innerSearch").style.cssText = "padding: 30px; background-color: #707372; border: solid 1px #707372; color: white;";

        document.getElementById("printVal").innerHTML = project.client;
        document.getElementById("printVal2").innerHTML = project.descShort;
        document.getElementById("printVal3").innerHTML = project.descLong;
        document.getElementById("printVal4").innerHTML = project.teamLeader;
        document.getElementById("printVal0").innerHTML = project.title;

      }
    });

    console.log(searchRes);

    if(val === ''){
      document.getElementById("outerSearch").style.cssText = "";
        document.getElementById("innerSearch").style.cssText = "";
        document.getElementById("printVal").innerHTML = '';
        document.getElementById("printVal2").innerHTML = '';
        document.getElementById("printVal3").innerHTML = '';
        document.getElementById("printVal4").innerHTML = '';
        document.getElementById("printVal0").innerHTML = '';

        count = 0;

        searchRes.length = 0;
    }


  }


}
