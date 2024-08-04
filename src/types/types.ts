export type Ticker = {
  id: string;
  ticker: string;
  amount: number;
  dpa: number;
  currentYield: number;
  expectedYield: number;
  currentPrice: number;
  ceilingPrice: number;
  safetyMargin: number;
};

export type Ranking = {
  id: string;
  rank: number;
  ticker: string;
  currentPrice: number;
  fairValue: number;
  dividendYield: number;
  pvp: number;
  safetyMargin: number;
  pegratio?: number;
};

export type TickerWallet = {
  ticker: string;
  totalReais: number;
  totalPercentage: number;
};

export type Profile = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  plan_id: number;
};
