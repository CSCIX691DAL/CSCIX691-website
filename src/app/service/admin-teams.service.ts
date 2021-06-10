import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

import Team from '../admin-create-teams/admin-team.model';

@Injectable({
    providedIn: 'root'
  })
  export class FirebaseService {
    projectReference: AngularFireList<Team>;
    teams?: Team[];
  
    constructor(private db: AngularFireDatabase) {
      this.projectReference = db.list('Projects/');
  
    }
  
    // Returns a list of Projects
    getTeams(){
      return this.db.database.ref('StudentTeams/').get();
    }
    
}
