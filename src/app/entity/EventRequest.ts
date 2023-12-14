import {CompleteBetType} from "./CompleteBetType";

export class EventRequest {
  name: string;
  description: string;
  creator: string;
  completeBetTypeDtoList: CompleteBetType[];
  userGroups: string[];
  userProfiles: string[];
  startsAt: Date;
  endsAt: Date;
  selectedTemplate: string;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.creator = data.creator || '';
    this.completeBetTypeDtoList = data.completeBetTypeDtoList || [];
    this.userGroups = data.userGroups || [];
    this.userProfiles = data.userProfiles || [];
    this.startsAt = data.startsAt || null;
    this.endsAt = data.endsAt || null;
    this.selectedTemplate = data.selectedTemplate || '';
  }
}
