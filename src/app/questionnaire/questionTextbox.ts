import { QuestionBase } from './questionBase';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
}