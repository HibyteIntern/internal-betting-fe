import { UserProfile } from "./UserProfile";


export interface PrizeDrawEntry {
  id: number;
  user: UserProfile;
  amount: number;
}
