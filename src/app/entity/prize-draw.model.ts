import { Status } from './Status';
import { DrawType } from './DrawType';
import { PrizeDrawEntry } from './prize-draw-entry.model';
import { UserProfile } from './user.profile.model';

export interface PrizeDraw {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  endsAt: Date;
  prizeDescription: string;
  type: DrawType;
  winner: UserProfile;
  entries: PrizeDrawEntry[];
  currentLeader: PrizeDrawEntry | null;
}
