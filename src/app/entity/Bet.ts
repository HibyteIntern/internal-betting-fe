import { UserProfile } from "./UserProfile";

export interface Bet{
  betId?: number,
  user?: UserProfile,
  amount: number,
  odds: number,
  value: string,
}
