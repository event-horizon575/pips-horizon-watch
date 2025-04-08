
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Influencer, Prediction } from "@/types";
import { formatDate } from "@/lib/utils";

interface SpotlightCardProps {
  influencer: Influencer;
  recentPredictions: Prediction[];
}

const SpotlightCard = ({ influencer, recentPredictions }: SpotlightCardProps) => {
  const accuracy = influencer.accuracy ?? 0;
  const totalPredictions = influencer.winCount + influencer.lossCount;
  const latestPrediction = recentPredictions[0];
  const predictionStatus = latestPrediction?.direction === "bullish" ? "bullish" : "bearish";

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getResultBadge = (result?: 'correct' | 'incorrect' | 'pending') => {
    if (result === 'correct') return 'bg-green-500/20 text-green-500';
    if (result === 'incorrect') return 'bg-red-500/20 text-red-500';
    return 'bg-yellow-500/20 text-yellow-500';
  };

  const getDirectionBadge = (direction: Prediction['direction']) => {
    if (direction === 'bullish') return 'bg-green-500/20 text-green-500';
    if (direction === 'bearish') return 'bg-red-500/20 text-red-500';
    return 'bg-yellow-500/20 text-yellow-500';
  };

  return (
    <Card className="h-full overflow-hidden border border-border bg-card hover:border-accent/50 transition-all">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={influencer.avatarUrl} alt={influencer.name} />
              <AvatarFallback>{getInitials(influencer.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">{influencer.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {accuracy}% Accuracy
                </Badge>
                <Badge variant="outline" className="bg-secondary/80 text-accent-foreground border-border/20">
                  {totalPredictions} Predictions
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-accent text-accent-foreground border-none">
              Featured by OnlyPips
            </Badge>
            <div 
              className={`h-3 w-3 rounded-full ${
                predictionStatus === "bullish" ? "bg-green-500" : "bg-red-500"
              }`} 
              title={`${predictionStatus === "bullish" ? "Bullish" : "Bearish"} latest prediction`}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          {influencer.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {influencer.description}
            </p>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Recent Predictions</h4>
            <div className="space-y-2">
              {recentPredictions.map(prediction => (
                <div key={prediction.id} className="flex items-center justify-between rounded-md p-2 bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{prediction.eventType}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(prediction.eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${getDirectionBadge(prediction.direction)}`}>
                      {prediction.direction}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium ${getResultBadge(prediction.result)}`}>
                      {prediction.result ?? 'pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Link 
              to={`/influencer/${influencer.id}`} 
              className="text-xs text-primary hover:underline"
            >
              View full prediction history
            </Link>
            <a 
              href={influencer.socialMediaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View Social Profile
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpotlightCard;
