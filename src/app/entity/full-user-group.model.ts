import {UserProfile} from "./UserProfile";


export interface FullUserGroupModel {
  userGroupId: number | null
  groupName: string
  profilePicture?: number
  description: string
  users: UserProfile[]
}
