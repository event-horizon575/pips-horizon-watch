
import { supabase } from '@/integrations/supabase/client';
import { toInfluencer, toPrediction } from '@/integrations/supabase/adapters';
import { Influencer, Prediction } from '@/types';

/**
 * Fetch all influencers from the database
 */
export async function getInfluencers(): Promise<Influencer[]> {
  const { data, error } = await supabase
    .from('influencers')
    .select('*');
  
  if (error) {
    console.error('Error fetching influencers:', error);
    throw error;
  }
  
  return data.map(toInfluencer);
}

/**
 * Fetch spotlighted influencers from the database
 */
export async function getSpotlightedInfluencers(): Promise<Influencer[]> {
  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .eq('spotlight', true);
  
  if (error) {
    console.error('Error fetching spotlighted influencers:', error);
    throw error;
  }
  
  return data.map(toInfluencer);
}

/**
 * Fetch a single influencer by ID
 */
export async function getInfluencerById(id: string): Promise<Influencer | null> {
  const { data, error } = await supabase
    .from('influencers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned (influencer not found)
      return null;
    }
    console.error('Error fetching influencer:', error);
    throw error;
  }
  
  return toInfluencer(data);
}

/**
 * Fetch predictions for a specific influencer
 */
export async function getPredictionsByInfluencerId(influencerId: string): Promise<Prediction[]> {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .eq('influencer_id', influencerId)
    .order('event_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
  
  return data.map(toPrediction);
}

/**
 * Fetch recent predictions for a specific influencer (limit to specified count)
 */
export async function getRecentPredictionsByInfluencerId(influencerId: string, count: number = 3): Promise<Prediction[]> {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .eq('influencer_id', influencerId)
    .order('event_date', { ascending: false })
    .limit(count);
  
  if (error) {
    console.error('Error fetching recent predictions:', error);
    throw error;
  }
  
  return data.map(toPrediction);
}
