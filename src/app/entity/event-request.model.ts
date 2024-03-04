import { BetType } from './bet-type.model';
import { Status } from './Status';
import { UserProfile } from './user-profile';

export class EventRequest {
  eventId?: number;
  name: string;
  description: string;
  creator?: UserProfile;
  betTypeList: BetType[];
  tags: string[];
  userGroups: string[];
  userProfiles: string[];
  startsAt: Date;
  endsAt: Date;
  status: Status;
  selectedTemplate: string;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.betTypeList = data.completeBetTypeDtoList || [];
    this.tags = data.tags || [];
    this.userGroups = data.userGroups || [];
    this.userProfiles = data.userProfiles || [];
    this.startsAt = data.startsAt || null;
    this.endsAt = data.endsAt || null;
    this.status = data.status || Status.DRAFT;
    this.selectedTemplate = data.selectedTemplate || '';
  }
}
