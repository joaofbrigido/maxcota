export type Ticker = {
  id: number;
  ticker: string;
  expected_dividend_yield: number;
  dpa_year: number;
  stocks_quantity: number;
  user_id: string;
};

export type TickerTable = {
  id: string;
  ticker: string;
  amount: number;
  dpa: string;
  // currentYield: string;
  expectedYield: string;
  currentPrice: string;
  ceilingPrice: string;
  safetyMargin: string;
  logo: string;
};

export type AllStocks = { 
  stock: string;
  logo: string;
  close: number;
  change: number;
  sector: string;
  type: string;
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

export type BrapiAvailableTickers = {
  indexes: string[];
  stocks: string[];
  error?: string;
  message?: string;
};

export type BrapiTickers = {
  change: number;
  close: number;
  logo: string;
  market_cap: number;
  name: string;
  sector: string;
  stock: string;
  type: string;
  volume: number;
};
