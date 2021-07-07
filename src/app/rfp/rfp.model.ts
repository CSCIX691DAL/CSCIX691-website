export default class RFP {
  key?: string | null;
  client: string // client reference
  status = 'Pending';

  // Required info
  projectTitle: string;
  contactName: string;
  organization: string;
  contactEmail: string;
  contactPhone: string;
  mailingAddress: string;
  date: string;
  projectAgreement: string;

  // Answers to supplementary questions. 
  // The key of each attribute is used to match the answer to a question
  supplementaryAnswers: Object[] = [];
}