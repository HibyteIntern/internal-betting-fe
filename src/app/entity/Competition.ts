import { UserProfile } from "./UserProfile";

export interface Competition {
    id?: number,
    description: string,
    creator: string,
    users: UserProfile[],
    userGroups: string[],
    userProfiles: string[],
    created: Date,
    lastModified: Date,
    status: string
}
