import { TeamService } from './../service/team.service';
import { UserService } from './../service/user.service';
import {Component, OnInit} from '@angular/core';
import { User } from '../user/user.model';
import { Student } from '../user/student.model';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  constructor(private userService: UserService, private teamService: TeamService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLogin") || !(localStorage.getItem("userType") === "admin")) {
      window.location.href = "/";
    }
  }

  // Returns a list of active users
  getActiveUsersFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {
      return user.active;
    });
  }

  // Returns a list of inactive users
  getInactiveUsersFromDB(): User[] {
    return this.userService.getUsers().filter((user, index, array) => {
      return !user.active;
    });
  }

  // Returns the name of the team which the given user is on. Returns 'None' if user is not on a team.
  getTeamName(user: User): string {
    // if the user is a student and is on a team
    if (this.userService.isStudent(user) && (<Student>user).team) {
      // get the team from the database
      let team = this.teamService.getTeamByKey((<Student>user).team);

      // if the team exists
      if (team) {
        return team.name;
      }
    }

    return 'None';
  }

  deleteMember(user: User): void { 
    // remove user from team, if applicable
    if (this.userService.isStudent(user)) {
      let student = <Student>user;
      this.teamService.removeStudentFromTeam(this.teamService.getTeamByKey(student.team), student);
    }
    // delete user from database
    this.userService.deleteUser(user);
  }
}
