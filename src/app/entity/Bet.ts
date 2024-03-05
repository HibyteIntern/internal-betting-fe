import { FullUserProfile } from './full-user-profile';

export interface Bet {
  betId?: number;
  user?: FullUserProfile;
  betType: number;
  amount: number;
  odds: number;
  event: number;
  value: string;
}
