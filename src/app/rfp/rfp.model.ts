export default class RFP {
  key?: string | null;
  projectTitle: string;

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

  defaultOptions: any[] = [
    {name: 'Yes'},
    {name: 'No'},
  ];

  specificSoftwareOptions: any[] = [
    {name: 'Yes'},
    {name: 'No'},
    {name: 'Maybe'},
  ];

  reportingOptions: any[] = [
    {name: 'Weekly'},
    {name: 'Bi-Weekly'},
    {name: 'Not at all'},
  ];

  specifyTestersOptions: any[] = [
    {name: 'Student team'},
    {name: 'Someone from our office'},
    {name: 'Not applicable'},
  ];

  status = 'Pending';
}