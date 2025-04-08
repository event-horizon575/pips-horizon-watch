
import { Database } from './types';
import { Influencer, Prediction, PredictionDirection, EventType, ForexPair } from '@/types';

// Type for database tables
type Tables = Database['public']['Tables'];
type DbInfluencer = Tables['influencers']['Row'];
type DbPrediction = Tables['predictions']['Row'];

/**
 * Convert a database influencer to our application Influencer type
 */
export function toInfluencer(dbInfluencer: DbInfluencer): Influencer {
  return {
    id: dbInfluencer.id,
    name: dbInfluencer.name,
    socialMediaUrl: dbInfluencer.social_media_url,
    winCount: dbInfluencer.win_count,
    lossCount: dbInfluencer.loss_count,
    avatarUrl: dbInfluencer.avatar_url || undefined,
    // Calculate accuracy as needed
    accuracy: calculateAccuracy(dbInfluencer.win_count, dbInfluencer.loss_count)
  };
}

/**
 * Convert a database prediction to our application Prediction type
 */
export function toPrediction(dbPrediction: DbPrediction): Prediction {
  return {
    id: dbPrediction.id,
    influencerId: dbPrediction.influencer_id,
    eventType: dbPrediction.event_type as EventType,
    eventDate: dbPrediction.event_date,
    pair: dbPrediction.pair as ForexPair,
    direction: dbPrediction.direction as PredictionDirection,
    result: dbPrediction.result as 'correct' | 'incorrect' | 'pending' | undefined,
    actualDirection: dbPrediction.actual_direction as PredictionDirection | undefined,
    postUrl: dbPrediction.post_url || undefined,
    notes: dbPrediction.notes || undefined,
    createdAt: dbPrediction.created_at
  };
}

/**
 * Helper function to calculate accuracy percentage
 */
function calculateAccuracy(wins: number, losses: number): number {
  const total = wins + losses;
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
}
