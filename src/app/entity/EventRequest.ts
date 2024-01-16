import { CompleteBetType } from './complete-bet-type.model';
import { Status } from './Status';

export class EventRequest {
  name: string;
  description: string;
  creator: string;
  completeBetTypeDtoList: CompleteBetType[];
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
    this.creator = data.creator || '';
    this.completeBetTypeDtoList = data.completeBetTypeDtoList || [];
    this.tags = data.tags || [];
    this.userGroups = data.userGroups || [];
    this.userProfiles = data.userProfiles || [];
    this.startsAt = data.startsAt || null;
    this.endsAt = data.endsAt || null;
    this.status = data.status || Status.DRAFT;
    this.selectedTemplate = data.selectedTemplate || '';
  }
}
