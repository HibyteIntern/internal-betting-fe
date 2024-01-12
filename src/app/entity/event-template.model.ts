import { BetTemplate } from './bet-template.model';

export interface EventTemplate {
  id?: number;
  name: string;
  betTemplates: BetTemplate[];
}
