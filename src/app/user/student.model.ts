import Team from "../team/team.model";
import { User } from "./user.model";

export class Student extends User {
  studentID: string;
  teamLeader: boolean;
  team: Team;
}