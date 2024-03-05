import { FullUserGroupModel } from './full-user-group.model';
import { Role } from './Role';
import { Bet } from './bet.model';

export interface FullUserProfile {
  userId?: number;
  keycloakId?: string;
  username: string;
  profilePicture?: number;
  description?: string;
  coins?: number;
  bets?: Bet[];
  groups?: FullUserGroupModel[];
  roles?: Role[];
}
