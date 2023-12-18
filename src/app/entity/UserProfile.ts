import {Bet} from "./Bet";


export class UserProfile {
  userId: number | null = null;
  keycloakId: string | null = null;
  username: string | null = null;
  profilePicture: number | null = null;
  description: string | null = null;
  bets: Bet[] | null = null;
  coins: number | null = null;
}
