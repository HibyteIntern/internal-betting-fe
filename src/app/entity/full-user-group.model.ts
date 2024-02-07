import { FullUserProfile } from './full-user-profile';

export interface FullUserGroupModel {
  userGroupId: number | null;
  groupName: string;
  profilePicture?: number;
  description: string;
  users: FullUserProfile[];
}
