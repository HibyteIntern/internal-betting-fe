import { BetTemplate } from './BetTemplate';

export interface EventTemplate {
  id?: number;
  name: string;
  betTemplates: BetTemplate[];
}
