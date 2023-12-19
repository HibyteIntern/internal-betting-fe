export interface CompleteBetType {
  id?: number;
  name: string;
  type: CompleteBetType;
  multipleChoiceOptions?: string[];
  odds?: number[];
}
