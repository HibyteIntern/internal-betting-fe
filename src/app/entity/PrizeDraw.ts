import {Status} from "./Status";
import {DrawType} from "./DrawType";
import {PrizeDrawEntry} from "./PrizeDrawEntry";

export interface PrizeDraw {
  id: number,
  title: string,
  description: string,
  status: Status,
  createdAt: Date,
  endsAt: Date,
  prizeDescription: string,
  type: DrawType,
  winner: never, //temporary until UserProfile integration
  entries: PrizeDrawEntry[]
}
