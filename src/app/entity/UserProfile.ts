import { Bet } from './Bet';

export interface UserProfile {
  id?: number;
  userId?: number;
  keycloakId?: string;
  username?: string;
  profilePicture?: number;
  description?: string;
  coins?: number;
  bets?: any[];
}
