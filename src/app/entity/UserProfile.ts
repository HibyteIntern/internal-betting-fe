import { Bet } from "./Bet";

export interface UserProfile{
    userId?: number,
    keycloakId?: String ,
    username?: String,
    profilePicture?: number,
    description?: String,
    coins?: number,
    bets?: Bet[],
}
