import { Event } from './event.model';
import { Status } from './Status';
import { FullUserProfile } from './full-user-profile';

export interface Competition {
  id?: number;
  name: string;
  description: string;
  creator: string;
  users: FullUserProfile[];
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
  events: number[];
  status: Status;
}
