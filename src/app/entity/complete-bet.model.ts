import { FullUserProfile } from './full-user-profile';

export interface CompleteBet {
  betId?: number;
  user?: FullUserProfile;
  betTypeId: number;
  amount: number;
  odds: number;
  eventId: number;
  value: string;
}
