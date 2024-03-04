import { LeaderboardEntry } from './leaderboard-entry';

export interface Leaderboard {
  id: number;
  name: string;
  entries: LeaderboardEntry[];
}
