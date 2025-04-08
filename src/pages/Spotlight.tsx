
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import SpotlightCard from "@/components/SpotlightCard";
import { getSpotlightedInfluencers, getRecentPredictionsByInfluencerId } from "@/services/influencerService";
import { Influencer, Prediction } from "@/types";

const Spotlight = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [influencerPredictions, setInfluencerPredictions] = useState<Map<string, Prediction[]>>(new Map());
  
  // Query to fetch spotlighted influencers
  const { data: spotlightedInfluencers, isLoading, error } = useQuery({
    queryKey: ['spotlightedInfluencers'],
    queryFn: getSpotlightedInfluencers
  });

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  // Effect to load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Fetch recent predictions for each spotlighted influencer
  useEffect(() => {
    if (spotlightedInfluencers && spotlightedInfluencers.length > 0) {
      const fetchPredictions = async () => {
        const newPredictionsMap = new Map<string, Prediction[]>();
        
        for (const influencer of spotlightedInfluencers) {
          try {
            const predictions = await getRecentPredictionsByInfluencerId(influencer.id, 3);
            newPredictionsMap.set(influencer.id, predictions);
          } catch (err) {
            console.error(`Error fetching predictions for influencer ${influencer.id}:`, err);
            newPredictionsMap.set(influencer.id, []);
          }
        }
        
        setInfluencerPredictions(newPredictionsMap);
      };
      
      fetchPredictions();
    }
  }, [spotlightedInfluencers]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleTheme={toggleTheme} showThemeToggle={true} />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Trader Spotlight</h1>
            <p className="text-muted-foreground">
              These are the traders catching eyes. Accuracy, consistency, and confidence. 
              Spotlight is where OnlyPips highlights the most notable NFP/FOMC predictors.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <p>Loading spotlighted traders...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20 text-destructive">
              <p>Error loading spotlighted traders. Please try again later.</p>
            </div>
          ) : spotlightedInfluencers && spotlightedInfluencers.length > 0 ? (
            <div className="grid gap-6">
              {spotlightedInfluencers.map((influencer: Influencer) => (
                <SpotlightCard 
                  key={influencer.id} 
                  influencer={influencer}
                  recentPredictions={influencerPredictions.get(influencer.id) || []}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <p>No spotlighted traders found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Spotlight;
