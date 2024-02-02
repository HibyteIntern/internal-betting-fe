export interface CompleteBetType {
  id?: number;
  name: string;
  // the type is supposed to be a string in the request
  type: string;
  multipleChoiceOptions?: string[];
  odds?: number[];
}
