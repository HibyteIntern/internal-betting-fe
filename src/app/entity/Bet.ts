import { UserProfile } from './UserProfile';
import { CompleteBetType } from './complete-bet-type.model';

export interface Bet {
  betId?: number;
  user?: UserProfile | null;
  amount: number;
  odds?: number;
  value: string;
  betType: CompleteBetType | undefined;
}
