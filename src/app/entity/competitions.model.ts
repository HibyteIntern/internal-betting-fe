import { EventRequest } from './event-request.model';
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
  events: EventRequest[];
  created: Date;
  lastModified: Date;
  status: Status;
}

export interface CompetitionRequest {
  name: string;
  description: string;
  users: number[];
  userGroups: string[];
  userProfiles: string[];
  events: number[];
  status: Status;
}
