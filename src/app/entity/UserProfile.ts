import { Bet } from "./Bet";
import {FullUserGroupModel} from "./full-user-group.model";

export interface UserProfile{
    userId?: number,
    keycloakId?: string ,
    username: string,
    profilePicture?: number,
    description?: string,
    coins?: number,
    bets?: Bet[],
    groups?: number[] | FullUserGroupModel[]
}
