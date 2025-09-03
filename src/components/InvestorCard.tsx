import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  MessageSquare, 
  Star,
  Brain,
  Users,
  TrendingUp,
  Building
} from "lucide-react";

interface InvestorCardProps {
  investor: {
    id: number;
    name: string;
    type: string;
    focus: string[];
    checkSize: string;
    stage: string[];
    location: string;
    portfolio: number;
    matched: boolean;
    aiScore: number;
    partnerName: string;
  };
}

const InvestorCard = ({ investor }: InvestorCardProps) => {
  return (
    <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-semibold text-card-foreground">{investor.name}</h3>
              {investor.matched && (
                <Badge className="bg-gradient-accent text-accent-foreground">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Match
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {investor.type}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {investor.location}
              </div>
            </div>
            
            {/* Investment Focus */}
            <div className="mb-4">
              <p className="text-sm font-medium text-card-foreground mb-2">Investment Focus</p>
              <div className="flex flex-wrap gap-1">
                {investor.focus.map((area, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Investment Stages */}
            <div className="mb-4">
              <p className="text-sm font-medium text-card-foreground mb-2">Preferred Stages</p>
              <div className="flex flex-wrap gap-1">
                {investor.stage.map((stage, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {stage}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {investor.matched && (
            <div className="ml-4 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-primary-foreground">{investor.aiScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">Match Score</p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Investment Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Check Size</p>
              <p className="text-sm text-muted-foreground">{investor.checkSize}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Portfolio</p>
              <p className="text-sm text-muted-foreground">{investor.portfolio} companies</p>
            </div>
          </div>
        </div>

        {/* Partner Contact */}
        <div className="bg-muted/30 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Key Contact</p>
              <p className="text-sm text-muted-foreground">{investor.partnerName}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>4.8 rating</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>92% response rate</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Briefcase className="w-4 h-4 mr-2" />
              View Portfolio
            </Button>
            <Button size="sm" className="bg-gradient-accent hover:opacity-90">
              <MessageSquare className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorCard;