
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Influencer } from "@/types";
import { calculateAccuracy } from "@/lib/utils";

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
  const accuracy = influencer.accuracy ?? calculateAccuracy(influencer.winCount, influencer.lossCount);
  const predictionStatus = accuracy >= 50 ? "bullish" : "bearish";

  return (
    <Link to={`/influencer/${influencer.id}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full overflow-hidden border border-border bg-card hover:border-accent/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{influencer.name}</CardTitle>
            <div 
              className={`h-3 w-3 rounded-full ${
                predictionStatus === "bullish" ? "bg-green-500" : "bg-red-500"
              }`} 
              title={`${predictionStatus === "bullish" ? "Bullish" : "Bearish"} prediction trend`}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Accuracy</span>
              <span className="font-medium">{accuracy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Record</span>
              <span className="font-medium">
                {influencer.winCount}W - {influencer.lossCount}L
              </span>
            </div>
            <div className="mt-2">
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
    </Link>
  );
};

export default InfluencerCard;
