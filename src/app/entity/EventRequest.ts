export class EventRequest {
  name: string;
  description: string;
  creator: string;

  userGroups: string;
  userProfiles: string;
  startsAt: Date;
  endsAt: Date;

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.creator = data.creator || '';
    this.userGroups = data.userGroups || '';
    this.userProfiles = data.userProfiles || '';
    this.startsAt = data.startsAt || null;
    this.endsAt = data.endsAt || null;
  }
}
