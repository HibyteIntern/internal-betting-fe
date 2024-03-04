import {Bet} from "./Bet";

export interface UserProfile {
  userId?: number;
  keycloakId?: string;
  username: string;
  profilePicture?: number;
  description?: string;
  coins?: number;
  bets?: Bet[];
  groups?: number[];
}
