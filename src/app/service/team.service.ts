import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Team from '../team/team.model';
import { Student } from '../user/student.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamReference: AngularFireList<Team>;
  teams?: Team[];

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.teamReference = db.list('Teams/');
    db.database.ref('Teams/').on('value', snapshot => {
      this.teams = snapshot.val() ?? [];
    });
    
    this.refreshTeams();
  }

  // Returns a list of Teams
  getTeams() : Team[] {
    return this.teams;
  }

  // Populates the list of Teams by reading from the database
  refreshTeams() {
    this.db.database.ref('Teams/').get().then(value => {
      this.teams = value.val() ?? [];
    });
  }

  // Adds a new team to the database
  addTeam(team: Team) {
    let key = this.teamReference.push(team).key; // add to database
    this.teamReference.update(key, { key: key });
  }

  // Changes an existing team
  updateTeam(team: Team, changes: Object): Promise<void> {
    return this.teamReference.update(team.key, changes);
  }

  // Deletes a team from the database
  deleteTeam(team: Team) {
    this.teamReference.remove(team.key);
  }

  // Returns a team with the specified key. Returns null if the team doesn't exist
  getTeamByKey(key: string): Team {
    let team = Object.values(this.teams).filter((team, index, array) => {
      return team.key == key;
    });

    if (!team) {
      return null;
    }

    return team.length == 0 ? null : team[0];
  }

  // Returns a team with the specified name. Returns null if the team doesn't exist
  getTeamByName(teamName: string): Team {
    let team = Object.values(this.teams).filter((team, index, array) => {
      return team.name == teamName;
    });

    if (!team) {
      return null;
    }

    return team.length == 0 ? null : team[0];
  }

  // Adds a student to the members list of a team
  addStudentToTeam(team: Team, student: Student) {
    // update team
    this.db.database.ref(`Teams/${team.key}/members/${student.key}`).set(true);
    // update student
    this.userService.updateUser(student, { team: team.key });
  }

  // Removes a student from a team
  removeStudentFromTeam(team: Team, student: User) {
    // remove student from team
    this.db.database.ref(`Teams/${team.key}/members/${student.key}`).remove();
    // update student
    this.userService.updateUser(student, { team: null });
  }

  // Moves a student from one team to another
  moveStudentToTeam(from: Team, to: Team, student: Student) {
    this.removeStudentFromTeam(from, student);
    this.addStudentToTeam(to, student);
  }
}
