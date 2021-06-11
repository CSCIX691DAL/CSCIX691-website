import Project from "../projects/project.model";
import { Student } from "../user/student.model";

export default class Team {
    key?: string | null;
    name: string;
    leaders: Student[];
    members: Student[];
    project: Project;
  }