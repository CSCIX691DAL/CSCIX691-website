import { TeamService } from './team.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { map } from 'rxjs/operators';
import Project from '../projects/project.model';
import RFP from '../rfp/rfp.model';
import DueDate from '../dueDates/dueDates.model'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectReference: AngularFireList<Project>;
  projectduedate: AngularFireList<DueDate>;
  projects?: Project[];
  duedates?: DueDate[];

  constructor(private db: AngularFireDatabase, private teamService: TeamService) {
    this.projectReference = db.list('Projects/');
    
    this.refreshProjects();
  }

  // Returns a list of Projects
  getProjects() : Project[] {
    return this.projects;
  }
  getDueDate() : DueDate[] {
    return this.duedates;
  }

  // Populates the list of Projects by reading from the database
  refreshProjects(): void {
    this.projectReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.projects = data;
    });
  }

  // Adds a new Project
  createProject(rfp: RFP): any {
    let project = new Project();
    project.azureLink = 'https://dev.azure.com/x691w21i/Website%20Summer%202021'; //place holder for azurelinks
    project.rfp = rfp;
    project.contactName = rfp.contactName;
    project.client = rfp.client; // set client to currently logged-in user
    project.descShort = rfp.problem;
    project.descLong = 'Testing testing testing' // need further clarification of where this comes from
    project.status = 'Accepted';
    project.team = null;
    project.term = this.setNextTerm();
    project.title = rfp.projectTitle;
    //this.type =

    let reference = this.projectReference.push(project);
    this.refreshProjects(); // update list of Projects
    return reference;
  }

  // Change an existing project
  updateProject(project: Project, changes: Object): Promise<void> {
    return this.projectReference.update(project.key, changes);
  }

  // Sets a new project's Term to the next academic term, based on the current time
  setNextTerm(): string {
    // get the current date
    let today = new Date();
    let thisMonth = today.getMonth();
    let nextTerm = '';
    let yearOfNextTerm;

    // if it is currently Winter
    if (thisMonth < 4) {
        // next term is Summer
        nextTerm += 'Summer';
    // if it is currently Summer
    } else if (thisMonth < 8) {
        // next term is Fall
        nextTerm += 'Fall';
    // if it is currently Fall
    } else {
        // next term is Winter
        nextTerm += 'Winter';
    }

    // check if the next term is in a new year
    if (nextTerm == 'Winter') {
        yearOfNextTerm = today.getFullYear() + 1;
    } else {
        yearOfNextTerm = today.getFullYear();
    }

    return nextTerm + ' ' + yearOfNextTerm;
  }

  // gets a list of projects associated with a user
  getProjectsByUID(uid: string): Project[] {
    return this.projects.filter((project, index, array) => {
      // if the project has an associated team...
      if (project.team) {
        // get the team object
        let projectTeam = this.teamService.getTeamByKey(project.team);
        // if the user is on the team...
        if (projectTeam.members[uid]) {
          return true;
        }
      }
    });
  }
}
