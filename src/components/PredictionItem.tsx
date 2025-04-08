
import { Card, CardContent } from "@/components/ui/card";
import { Prediction } from "@/types";
import { formatDate } from "@/lib/utils";

interface PredictionItemProps {
  prediction: Prediction;
}

const PredictionItem = ({ prediction }: PredictionItemProps) => {
  const getResultColor = () => {
    if (prediction.result === 'correct') return 'text-green-500';
    if (prediction.result === 'incorrect') return 'text-red-500';
    return 'text-yellow-500';
  };

  const getDirectionBadge = (direction: Prediction['direction']) => {
    if (direction === 'bullish') return 'bg-green-500/20 text-green-500';
    if (direction === 'bearish') return 'bg-red-500/20 text-red-500';
    return 'bg-yellow-500/20 text-yellow-500';
  };

  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Event</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{prediction.eventType}</p>
              <span className="text-xs text-muted-foreground">({formatDate(prediction.eventDate)})</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pair</p>
            <p className="font-medium">{prediction.pair}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Prediction</p>
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getDirectionBadge(prediction.direction)}`}>
              {prediction.direction}
            </span>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Result</p>
            <p className={`font-medium ${getResultColor()}`}>
              {prediction.result === 'pending' ? 'Pending' : 
                prediction.result === 'correct' ? 'Correct' : 'Incorrect'}
            </p>
          </div>
          
          {prediction.actualDirection && prediction.result !== 'pending' && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Actual</p>
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getDirectionBadge(prediction.actualDirection)}`}>
                {prediction.actualDirection}
              </span>
            </div>
          )}
          
          {prediction.postUrl && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Source</p>
              <a 
                href={prediction.postUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                View Post
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionItem;
