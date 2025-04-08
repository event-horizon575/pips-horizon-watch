
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PredictionItem from '@/components/PredictionItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Influencer, Prediction } from '@/types';
import { getInfluencerById, getPredictionsByInfluencerId } from '@/services/influencerService';
import { toast } from '@/hooks/use-toast';

const InfluencerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      setIsDarkMode(false);
    }
    
    if (!id) return;
    
    // Fetch data from Supabase
    const fetchData = async () => {
      try {
        setLoading(true);
        const influencerData = await getInfluencerById(id);
        setInfluencer(influencerData);
        
        if (influencerData) {
          const predictionsData = await getPredictionsByInfluencerId(id);
          setPredictions(predictionsData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load influencer data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header toggleTheme={toggleTheme} showThemeToggle={true} />
        <main className="container flex-1 px-4 py-12 md:px-6">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!influencer) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header toggleTheme={toggleTheme} showThemeToggle={true} />
        <main className="container flex-1 px-4 py-12 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Influencer Not Found</h1>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleTheme={toggleTheme} showThemeToggle={true} />
      
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <div className="mb-8">
            <Link to="/" className="mb-6 inline-flex items-center text-sm text-primary hover:underline">
              &larr; Back to all influencers
            </Link>
            
            <div className="grid gap-6">
              <Card className="border border-border">
                <CardHeader>
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <CardTitle className="text-2xl font-bold">{influencer.name}</CardTitle>
                      <CardDescription>
                        <a 
                          href={influencer.socialMediaUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          View Social Profile
                        </a>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="text-2xl font-bold">{influencer.accuracy ?? 0}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Record</p>
                        <p className="text-2xl font-bold">
                          <span className="text-green-500">{influencer.winCount}</span>
                          <span className="mx-1 text-muted-foreground">/</span>
                          <span className="text-red-500">{influencer.lossCount}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <div>
                <h2 className="mb-4 text-xl font-bold">Prediction History</h2>
                <div className="grid gap-4">
                  {predictions.length > 0 ? (
                    predictions.map((prediction) => (
                      <PredictionItem key={prediction.id} prediction={prediction} />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex h-24 items-center justify-center">
                        <p className="text-muted-foreground">No predictions available</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InfluencerDetails;
