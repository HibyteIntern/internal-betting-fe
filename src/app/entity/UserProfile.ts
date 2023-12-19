import { Bet } from "./Bet";

export interface UserProfile{
    id?: number,
    userId?: number,
    keycloakId?: String ,
    username?: String,
    profilePicture?: number,
    description?: String,
    coins?: number,
    bets?: Bet[],
}
