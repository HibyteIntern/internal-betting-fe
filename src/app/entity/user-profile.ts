import { Role } from './Role';
import { Bet } from './bet.model';

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
