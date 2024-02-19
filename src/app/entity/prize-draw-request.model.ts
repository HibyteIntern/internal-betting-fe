import { DrawType } from './DrawType';

export default interface PrizeDrawRequest {
  title: string;
  description: string;
  endsAt: Date;
  prizeDescription: string;
  type: DrawType;
}
