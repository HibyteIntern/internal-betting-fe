import { FullUserProfile } from './full-user-profile';

export interface Bet {
  betId?: number;
  user?: FullUserProfile;
  amount: number;
  odds: number;
  value: string;
}
