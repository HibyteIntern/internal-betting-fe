import { UserProfile } from './user.profile.model';

export interface PrizeDrawEntry {
  id: number;
  user: UserProfile;
  amount: number;
}
