import {Status} from "./Status";
import {DrawType} from "./DrawType";
import {PrizeDrawEntry} from "./PrizeDrawEntry";
import {UserProfile} from "./UserProfile";

export interface PrizeDraw {
  id: number,
  title: string,
  description: string,
  status: Status,
  createdAt: Date,
  endsAt: Date,
  prizeDescription: string,
  type: DrawType,
  winner: UserProfile, //temporary until UserProfile integration
  entries: PrizeDrawEntry[]
  currentLeader: PrizeDrawEntry | null
}
