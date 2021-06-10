import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { map } from 'rxjs/operators';
import Project from '../projects/project.model';
import RFP from '../rfp/rfp.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectReference: AngularFireList<Project>;
  projects?: Project[];

  constructor(private db: AngularFireDatabase) {
    this.projectReference = db.list('Projects/');
    this.refreshProjects();
  }

  // Returns a list of Projects
  getProjects() : Project[] {
    return this.projects;
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
    project.client = rfp.contactName;
    project.descShort = rfp.problem;
    project.descLong = 'Testing testing testing' // need further clarification of where this comes from
    project.status = 'Accepted';
    project.teamLeader = 'Mr. Placeholder' // change this once Teams are implemented
    project.term = this.setNextTerm();
    project.title = rfp.projectTitle;
    //this.type =

    let reference = this.projectReference.push(project);
    this.refreshProjects(); // update list of Projects
    return reference;
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
}
