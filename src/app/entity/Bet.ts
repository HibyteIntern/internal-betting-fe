import { UserProfile } from './UserProfile';

export interface Bet {
  betId?: number;
  user?: UserProfile | null;
  amount: number;
  odds: number | number[];
  value: string;
}
