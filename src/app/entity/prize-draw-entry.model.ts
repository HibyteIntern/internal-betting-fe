import { UserProfile } from './user-profile';

export interface PrizeDrawEntry {
  id: number;
  user: UserProfile;
  amount: number;
}
