import { Status } from "./Status";
import { UserProfile } from "./UserProfile";

export interface Competition {
    id?: number,
    name: string,
    description: string,
    creator: string,
    users: UserProfile[],
    userGroups: string[],
    userProfiles: string[],
    events: Event[],
    created: Date,
    lastModified: Date,
    status: Status
}

export interface CompetitionRequest {
    name: string,
    description: string,
    users: UserProfile[],
    userGroups: string[],
    userProfiles: string[],
    events: number[],
    status: Status
}
