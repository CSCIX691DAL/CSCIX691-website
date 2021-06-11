import { User } from "./user.model";

export class Student extends User {
  studentID: string;
  teamLeader: boolean;
  //team: Team <-- for future use, when teams are implemented
}