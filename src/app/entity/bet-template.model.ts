import { BetTemplateType } from './bet-template-type';

export interface BetTemplate {
  id?: number;
  name: string;
  type: BetTemplateType;
  multipleChoiceOptions?: string[];
}
