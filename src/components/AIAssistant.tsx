import { useState } from "react";
import { generateAIResponse } from "@/services/geminiApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  X, 
  Zap,
  ArrowRight,
  Target,
  MessageSquare,
  Send,
  Loader2
} from "lucide-react";

interface AIAssistantProps {
  type: "investor" | "founder";
  onClose: () => void;
}

const AIAssistant = ({ type, onClose }: AIAssistantProps) => {
  const [currentView, setCurrentView] = useState<"recommendations" | "chat">("recommendations");
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage, type);
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[600px] bg-background border border-border rounded-lg shadow-xl z-50 flex flex-col">
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
          <div className="flex flex-col h-80">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
              {chatMessages.length === 0 ? (
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Hi! I'm your AI assistant. Ask me anything about {type === "investor" ? "investments, due diligence, or market insights" : "fundraising, pitching, or business development"}.
                  </p>
                </div>
              ) : (
                chatMessages.map((message, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-muted/50 mr-4'
                  }`}>
                    <p className="text-xs leading-relaxed">{message.content}</p>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="p-3 bg-muted/50 rounded-lg mr-4 flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <p className="text-xs text-muted-foreground">Thinking...</p>
                </div>
              )}
            </div>
            
            {/* Chat Input */}
            <div className="flex items-center space-x-2 border-t pt-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 text-xs"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default AIAssistant;