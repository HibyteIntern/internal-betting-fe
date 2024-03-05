import { BetType } from './bet-type.model';
import { Status } from './Status';
import { UserProfile } from './user-profile';
import { CompleteBet } from './complete-bet.model';

export class Event {
  eventId?: number;
  name: string;
  description: string;
  creator?: UserProfile;
  tags: string[];
  combinedUserProfileIds: number[];
  userGroupIds: number[];
  userProfileIds: number[];
  betTypeDtoList: BetType[];
  bets: CompleteBet[];
  created: Date;
  lastModified: Date;
  startsAt: Date;
  endsAt: Date;
  status: Status;
  selectedTemplate?: string;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.betTypeDtoList = data.betTypeDtoList || [];
    this.bets = data.bets || [];
    this.tags = data.tags || [];
    this.combinedUserProfileIds = data.combinedUserProfileIds || [];
    this.userGroupIds = data.userGroups || [];
    this.userProfileIds = data.userProfiles || [];
    this.created = data.created || null;
    this.lastModified = data.lastModified || null;
    this.startsAt = data.startsAt || null;
    this.endsAt = data.endsAt || null;
    this.status = data.status || Status.DRAFT;
    this.selectedTemplate = data.selectedTemplate || '';
  }
}
