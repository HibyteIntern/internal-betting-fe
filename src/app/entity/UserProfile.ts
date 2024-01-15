import { Bet } from "./Bet";
import {UserGroupModel} from "./user-group.model";

export interface UserProfile{
    userId?: number,
    keycloakId?: string ,
    username?: string,
    profilePicture?: number,
    description?: string,
    coins?: number,
    bets?: Bet[],
    groups?: UserGroupModel[]
}
