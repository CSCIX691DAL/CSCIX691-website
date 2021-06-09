import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Team from '../team/team.model';
import { Student } from '../user/student.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamReference: AngularFireList<Team>;
  teams?: Team[];

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.teamReference = db.list('Teams/');
    this.refreshTeams();
  }

  // Returns a list of Teams
  getTeams() : Team[] {
    return this.teams;
  }

  // Populates the list of Teams by reading from the database
  refreshTeams(): void {
    this.teamReference.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.teams = data;
    });
  }

  // Adds a new team to the database
  addTeam(team: Team) {
    this.teamReference.push(team); // add to database
  }

  // Changes an existing team
  updateTeam(team: Team, changes: Object): Promise<void> {
    return this.teamReference.update(team.key, changes);
  }

  // Deletes a team from the database
  deleteTeam(team: Team) {
    this.teamReference.remove(team.key);
  }

  // Adds a student to the members list of a team
  addStudentToTeam(team: Team, student: Student) {
    this.db.database.ref(`Teams/${team.key}/members/`).push(student);
  }

  // Removes a student from a team
  removeStudentFromTeam(team: Team, student: Student) {
    // remove student from team
    this.db.database.ref(`Teams/${team.key}/members/${student.key}`).remove();
  }

  // Moves a student from one team to another
  moveStudentToTeam(from: Team, to: Team, student: Student) {
    this.removeStudentFromTeam(from, student);
    this.addStudentToTeam(to, student);
  }

  // Sets a student as a leader of a team
  makeLeader(team: Team, student: Student) {
    // update the student's info
    this.userService.updateUser(student, { teamLeader: true });
    // update the team's database entry
    this.db.database.ref(`Teams/${team.key}/leaders/`).push(student);
  }

  // Removes a student as a leader of a team
  unmakeLeader(team: Team, student: Student) {
    // update the student's info
    this.userService.updateUser(student, { teamLeader: false });
    // update the team's database entry
    this.db.database.ref(`Teams/${team.key}/leaders/`).push(student);
  }
}
