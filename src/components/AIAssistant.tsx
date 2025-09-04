import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  X, 
  Zap,
  ArrowRight,
  Target,
  MessageSquare
} from "lucide-react";

interface AIAssistantProps {
  type: "investor" | "founder";
  onClose: () => void;
}

const AIAssistant = ({ type, onClose }: AIAssistantProps) => {
  const [currentView, setCurrentView] = useState<"recommendations" | "chat">("recommendations");

  const investorRecommendations = [
    {
      title: "High-Potential CleanTech Match",
      subtitle: "SolarMax Technologies - Series A",
      score: 94,
      reasoning: "Strong alignment with your renewable energy portfolio.",
      action: "Review Pitch",
      urgent: true
    },
    {
      title: "Emerging AI Healthcare Startup",
      subtitle: "MedVision AI - Seed Round",
      score: 89,
      reasoning: "Early-stage opportunity in your preferred sector.",
      action: "Schedule Call",
      urgent: false
    }
  ];

  const founderRecommendations = [
    {
      title: "Perfect VC Match",
      subtitle: "GreenTech Ventures",
      score: 96,
      reasoning: "Led 8 CleanTech Series A rounds. Matches your needs.",
      action: "Send Pitch",
      urgent: true
    },
    {
      title: "Industry Expert Investor",
      subtitle: "Sarah Chen (Angel)",
      score: 91,
      reasoning: "Former solar industry executive with strategic value.",
      action: "Request Introduction",
      urgent: false
    }
  ];

  const recommendations = type === "investor" ? investorRecommendations : founderRecommendations;

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[500px] bg-background border border-border rounded-lg shadow-xl z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <CardTitle className="text-sm">AI Assistant</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant={currentView === "recommendations" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("recommendations")}
              className="h-7 px-2 text-xs"
            >
              Matches
            </Button>
            <Button
              variant={currentView === "chat" ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentView("chat")}
              className="h-7 px-2 text-xs"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-7 w-7 p-0">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="overflow-y-auto max-h-80 pb-4">
        {currentView === "recommendations" ? (
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-card/50 rounded-lg border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-semibold text-card-foreground">
                        {rec.title}
                      </h4>
                      {rec.urgent && (
                        <Badge className="bg-gradient-accent text-accent-foreground text-xs px-1 py-0">
                          <Zap className="w-2 h-2 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{rec.subtitle}</p>
                    <p className="text-xs text-card-foreground">{rec.reasoning}</p>
                  </div>
                  <div className="ml-2 text-center">
                    <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-accent-foreground">{rec.score}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full text-xs h-7">
                  {rec.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                AI Chat assistant coming soon...
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default AIAssistant;