import {UserProfile} from "./UserProfile";


export interface UserGroupModel{
  userGroupId: number | null
  groupName: string
  profilePicture?: number
  description: string
  users: UserProfile[]
}
