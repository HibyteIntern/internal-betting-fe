import { Bet } from "./Bet";

export interface UserProfile{
    id?: number,
    userId?: number,
    keycloakId?: String ,
    username?: string,
    profilePicture?: number,
    description?: String,
    coins?: number,
    bets?: any[],
}
