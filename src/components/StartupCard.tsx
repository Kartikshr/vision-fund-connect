import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Eye, 
  MessageSquare, 
  Star,
  Brain,
  Lightbulb,
  TrendingUp
} from "lucide-react";

interface StartupCardProps {
  startup: {
    id: number;
    name: string;
    category: string;
    stage: string;
    fundingGoal: number;
    raised: number;
    description: string;
    founderName: string;
    location: string;
    employees: number;
    matched: boolean;
    aiScore: number;
    isIdea?: boolean;
  };
  isInvestor?: boolean;
}

const StartupCard = ({ startup, isInvestor = false }: StartupCardProps) => {
  const fundingProgress = (startup.raised / startup.fundingGoal) * 100;

  return (
    <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-semibold text-card-foreground">{startup.name}</h3>
              {startup.matched && (
                <Badge className="bg-gradient-accent text-accent-foreground">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Match
                </Badge>
              )}
              {startup.isIdea && (
                <Badge variant="outline" className="border-warning text-warning">
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Idea Stage
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <Badge variant="secondary">{startup.category}</Badge>
              <Badge variant="secondary">{startup.stage}</Badge>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {startup.location}
              </div>
            </div>
            <p className="text-card-foreground leading-relaxed mb-4">
              {startup.description}
            </p>
          </div>
          {startup.matched && (
            <div className="ml-4 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-primary-foreground">{startup.aiScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">AI Score</p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Funding Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-card-foreground">Funding Progress</span>
            <span className="text-sm text-muted-foreground">
              ${(startup.raised / 1000000).toFixed(1)}M of ${(startup.fundingGoal / 1000000).toFixed(1)}M
            </span>
          </div>
          <Progress value={fundingProgress} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(fundingProgress)}% funded</span>
            <span>${((startup.fundingGoal - startup.raised) / 1000000).toFixed(1)}M remaining</span>
          </div>
        </div>

        {/* Founder & Team Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium text-card-foreground">Founder</p>
              <p className="text-sm text-muted-foreground">{startup.founderName}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{startup.employees} employees</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>127 views</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>23 interested</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isInvestor ? (
              <>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Invest
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" className="bg-gradient-accent hover:opacity-90">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StartupCard;