
export type Influencer = {
  id: string;
  name: string;
  socialMediaUrl: string;
  winCount: number;
  lossCount: number;
  accuracy?: number; // Calculated field
  avatarUrl?: string;
  description?: string;
  spotlight?: boolean;
};

export type PredictionDirection = 'bullish' | 'bearish' | 'neutral';

export type EventType = 'NFP' | 'CPI' | 'FOMC' | 'Other';

export type ForexPair = 
  'EURUSD' | 'GBPUSD' | 'USDJPY' | 'AUDUSD' | 
  'USDCAD' | 'USDCHF' | 'NZDUSD' | 'EURGBP' | 
  'XAUUSD' | 'Other';

export type Prediction = {
  id: string;
  influencerId: string;
  eventType: EventType;
  eventDate: string;
  pair: ForexPair;
  direction: PredictionDirection;
  result?: 'correct' | 'incorrect' | 'pending';
  actualDirection?: PredictionDirection;
  postUrl?: string;
  notes?: string;
  createdAt: string;
};
