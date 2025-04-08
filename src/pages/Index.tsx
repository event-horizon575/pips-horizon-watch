
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InfluencerCard from '@/components/InfluencerCard';
import { Influencer } from '@/types';
import { Button } from '@/components/ui/button';
import { getInfluencers } from '@/services/influencerService';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [sortByAccuracy, setSortByAccuracy] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      setIsDarkMode(false);
    }
    
    // Fetch influencers from Supabase
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const data = await getInfluencers();
        setInfluencers(data);
      } catch (error) {
        console.error('Failed to fetch influencers:', error);
        toast({
          title: 'Error',
          description: 'Failed to load influencers. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfluencers();
  }, []);

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

  const handleSort = () => {
    const newSortState = !sortByAccuracy;
    setSortByAccuracy(newSortState);
    
    if (newSortState) {
      const sorted = [...influencers].sort((a, b) => {
        const accuracyA = a.accuracy ?? 0;
        const accuracyB = b.accuracy ?? 0;
        return accuracyB - accuracyA;
      });
      setInfluencers(sorted);
    } else {
      // Re-fetch to reset order
      getInfluencers().then(data => setInfluencers(data));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleTheme={toggleTheme} showThemeToggle={true} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-card py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                <span className="text-primary">Event</span> Horizon
              </h1>
              <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
                Tracking forex influencer predictions on high-impact news events like NFP, CPI, and FOMC.
                See who's consistently right and who's just making noise.
              </p>
            </div>
          </div>
        </section>
        
        {/* Influencers Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h2 className="text-2xl font-bold tracking-tight">Forex Influencers</h2>
                <Button 
                  variant="outline" 
                  onClick={handleSort}
                  className="w-full md:w-auto"
                >
                  {sortByAccuracy ? "Reset Order" : "Sort by Accuracy"}
                </Button>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-48 rounded-lg bg-muted animate-pulse"></div>
                  ))}
                </div>
              ) : influencers.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {influencers.map((influencer) => (
                    <InfluencerCard key={influencer.id} influencer={influencer} />
                  ))}
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">No influencers found</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="bg-card py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
              <p className="max-w-[42rem] text-muted-foreground">
                We track what popular forex influencers predict before major economic events.
                After the event occurs, we record the actual outcome and calculate their accuracy.
                This helps you identify which influencers provide consistent, reliable analysis.
              </p>
              <div className="flex flex-col gap-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Created with 💙 by <span className="font-medium text-primary">OnlyPips</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
