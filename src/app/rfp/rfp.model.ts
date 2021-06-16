export default class RFP {
  key?: string | null;
  projectTitle: string;
  client: string // client reference

  // Section
  contactName: string;
  organization: string;
  contactEmail: string;
  contactPhone: string;
  mailingAddress: string;

  // Problem
  problem: string;

  // Desired Outcome
  idealSituation: string;
  specifySpecificSoftware: string;
  specifyOtherReporting: string;
  specifyBudget: string;
  specifyUsabilityConsiderations: string;

  // Testing
  kindOfTests: string;
  sampleData: string;

  specificSoftware: string;
  videoCallMeeting: string;
  emailReporting: string;
  requireNDA: string;
  requireIP: string;
  budget: string;
  trainingSession: string;
  howToDocumentation: string;
  usabilityConsiderations: string;
  realLifeTesting: string;
  specifyTesters: string;
  projectAgreement: string;
  date: string;

  status = 'Pending';
}