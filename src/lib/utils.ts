
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Influencer, Prediction } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAccuracy(winCount: number, lossCount: number): number {
  const total = winCount + lossCount
  if (total === 0) return 0
  return Math.round((winCount / total) * 100)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getDummyInfluencers(): Influencer[] {
  return [
    {
      id: '1',
      name: 'Forex Master',
      socialMediaUrl: 'https://twitter.com/forexmaster',
      winCount: 15,
      lossCount: 5,
      accuracy: 75
    },
    {
      id: '2',
      name: 'Trading Guru',
      socialMediaUrl: 'https://twitter.com/tradingguru',
      winCount: 12,
      lossCount: 8,
      accuracy: 60
    },
    {
      id: '3',
      name: 'Market Whisperer',
      socialMediaUrl: 'https://twitter.com/marketwhisperer',
      winCount: 18,
      lossCount: 2,
      accuracy: 90
    }
  ]
}

export function getDummyPredictions(influencerId: string): Prediction[] {
  return [
    {
      id: '1',
      influencerId,
      eventType: 'NFP',
      eventDate: '2023-12-01',
      pair: 'XAUUSD',
      direction: 'bullish',
      result: 'correct',
      actualDirection: 'bullish',
      postUrl: 'https://twitter.com/example/status/1',
      createdAt: '2023-11-30'
    },
    {
      id: '2',
      influencerId,
      eventType: 'CPI',
      eventDate: '2024-01-15',
      pair: 'EURUSD',
      direction: 'bearish',
      result: 'incorrect',
      actualDirection: 'bullish',
      postUrl: 'https://twitter.com/example/status/2',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      influencerId,
      eventType: 'FOMC',
      eventDate: '2024-02-20',
      pair: 'GBPUSD',
      direction: 'bullish',
      result: 'correct',
      actualDirection: 'bullish',
      postUrl: 'https://twitter.com/example/status/3',
      createdAt: '2024-02-19'
    },
    {
      id: '4',
      influencerId,
      eventType: 'NFP',
      eventDate: '2024-03-10',
      pair: 'USDJPY',
      direction: 'bearish',
      result: 'pending',
      postUrl: 'https://twitter.com/example/status/4',
      createdAt: '2024-03-09'
    }
  ]
}
