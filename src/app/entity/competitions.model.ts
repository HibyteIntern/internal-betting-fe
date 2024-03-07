import { Event } from './event.model';
import { Status } from './Status';
import { UserProfile } from './user-profile';

export interface Competition {
  id?: number;
  name: string;
  description: string;
  creator?: UserProfile;
  users: UserProfile[];
  userGroups: string[];
  userProfiles: string[];
  events: Event[];
  created: Date;
  lastModified: Date;
  status: Status;
}

export interface CompetitionRequest {
  name: string;
  description: string;
  userGroups: string[];
  userProfiles: string[];
  events: string[];
  status: Status;
}
