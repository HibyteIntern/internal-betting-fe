import {BetTemplateType} from "./BetTemplateType";

export interface BetTemplate {
  id?: number;
  name: string;
  type: BetTemplateType;
  multipleChoiceOptions?: string[];
}
