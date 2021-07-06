import { QuestionBase } from './questionBase';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
}