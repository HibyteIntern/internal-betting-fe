import { Bet } from './Bet';
import { FullUserGroupModel } from './full-user-group.model';
import {Role} from "./Role";

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
