export interface LeaderboardRequest {
  leaderboardId?: number;
  metrics: string[];
  sortedBy: string;
}
