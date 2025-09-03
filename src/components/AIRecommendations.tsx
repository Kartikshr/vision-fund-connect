import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  Star,
  ArrowRight,
  DollarSign,
  Lightbulb
} from "lucide-react";

interface AIRecommendationsProps {
  type: "investor" | "founder";
}

const AIRecommendations = ({ type }: AIRecommendationsProps) => {
  const investorRecommendations = [
    {
      title: "High-Potential CleanTech Match",
      subtitle: "SolarMax Technologies - Series A",
      score: 94,
      reasoning: "Strong alignment with your renewable energy portfolio. Their 40% efficiency improvement matches your investment thesis.",
      action: "Review Pitch",
      urgent: true
    },
    {
      title: "Emerging AI Healthcare Startup",
      subtitle: "MedVision AI - Seed Round",
      score: 89,
      reasoning: "Early-stage opportunity in your preferred sector. Strong team with previous exits.",
      action: "Schedule Call",
      urgent: false
    },
    {
      title: "Student Innovation Opportunity",
      subtitle: "EduVerse VR Platform - Pre-Seed",
      score: 76,
      reasoning: "Fits your micro-investment criteria. High growth potential in EdTech sector.",
      action: "View Details",
      urgent: false
    }
  ];

  const founderRecommendations = [
    {
      title: "Perfect VC Match",
      subtitle: "GreenTech Ventures",
      score: 96,
      reasoning: "Led 8 CleanTech Series A rounds. Average check size $2.5M matches your needs exactly.",
      action: "Send Pitch",
      urgent: true
    },
    {
      title: "Industry Expert Investor",
      subtitle: "Sarah Chen (Angel)",
      score: 91,
      reasoning: "Former solar industry executive. Provides strategic value beyond capital.",
      action: "Request Introduction",
      urgent: false
    },
    {
      title: "Strategic Corporate Partner",
      subtitle: "Energy Corp Ventures",
      score: 87,
      reasoning: "Could provide distribution channels and industry partnerships alongside funding.",
      action: "Explore Partnership",
      urgent: false
    }
  ];

  const recommendations = type === "investor" ? investorRecommendations : founderRecommendations;

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-medium">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
              <p className="text-primary-foreground/80">
                {type === "investor" 
                  ? "Personalized investment opportunities based on your portfolio and preferences"
                  : "Strategic investor matches tailored to your startup's profile and funding needs"
                }
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">{recommendations.length}</div>
              <div className="text-primary-foreground/80 text-sm">New Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {recommendations.reduce((acc, rec) => acc + rec.score, 0) / recommendations.length}
              </div>
              <div className="text-primary-foreground/80 text-sm">Avg. Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {recommendations.filter(rec => rec.urgent).length}
              </div>
              <div className="text-primary-foreground/80 text-sm">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold text-card-foreground">
                      {recommendation.title}
                    </h4>
                    {recommendation.urgent && (
                      <Badge className="bg-gradient-accent text-accent-foreground">
                        <Zap className="w-3 h-3 mr-1" />
                        High Priority
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground font-medium mb-3">
                    {recommendation.subtitle}
                  </p>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-accent mt-0.5" />
                    <p className="text-card-foreground leading-relaxed">
                      {recommendation.reasoning}
                    </p>
                  </div>
                </div>
                
                <div className="ml-6 text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-accent-foreground">
                      {recommendation.score}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Match Score</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    <span>
                      {type === "investor" ? "Investment Match" : "Funding Match"}
                    </span>
                  </div>
                  {recommendation.urgent && (
                    <div className="flex items-center text-accent">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>Trending Up</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  className={recommendation.urgent 
                    ? "bg-gradient-accent hover:opacity-90" 
                    : "bg-gradient-primary hover:opacity-90"
                  }
                  size="sm"
                >
                  {recommendation.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Learning Card */}
      <Card className="bg-muted/30 border-dashed border-2 border-muted-foreground/30">
        <CardContent className="p-6 text-center">
          <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold text-card-foreground mb-2">
            AI Learning & Improving
          </h4>
          <p className="text-muted-foreground mb-4">
            Our AI continuously learns from your preferences and market trends to provide better recommendations.
          </p>
          <Button variant="outline" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Provide Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;