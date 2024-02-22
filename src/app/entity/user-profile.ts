import { Bet } from './Bet';
import { Role } from './Role';

export interface UserProfile {
  userId?: number;
  keycloakId?: string;
  username: string;
  profilePicture?: number;
  description?: string;
  coins?: number;
  bets?: Bet[];
  roles?: Role[];
  groups?: number[];
}
