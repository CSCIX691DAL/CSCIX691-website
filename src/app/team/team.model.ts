import Project from "../projects/project.model";
import { Student } from "../user/student.model";

export default class Team {
    key?: string | null;
    name: string;
    members: string[]; // array of student keys
    project: Project;
  }