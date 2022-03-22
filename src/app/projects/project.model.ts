import RFP from "../rfp/rfp.model";
import Team from "../team/team.model";

export default class Project {
    key?: string | null;
    azureLink: string;
    rfp: RFP;
    client: string; // client reference
    contactName: string;
    descShort: string;
    descLong: string;
    status: string;
    team: string; // team reference
    term: string;
    title: string;
    type: string;
  teamLeader: string;
  }
