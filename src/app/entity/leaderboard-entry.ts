export interface LeaderboardEntry {
  userId: number;
  metrics: { [key: string]: number };
}
