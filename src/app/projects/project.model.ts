import RFP from "../rfp/rfp.model";

export default class Project {
    key?: string | null;
    rfp: RFP;
    client: string;
    descShort: string;
    descLong: string;
    status: string;
    teamLeader: string; // ideally replace this with a Team object once implemented
    term: string;
    title: string;
    type: string;
  }