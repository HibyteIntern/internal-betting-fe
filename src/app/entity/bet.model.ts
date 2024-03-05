export interface Bet {
  betId?: number;
  userId?: number;
  betTypeId: number;
  amount: number;
  odds: number;
  eventId: number;
  value: string;
}
