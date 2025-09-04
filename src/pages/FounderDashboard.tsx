import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Plus,
  MessageSquare, 
  Eye, 
  DollarSign, 
  Users, 
  TrendingUp,
  Brain,
  Star,
  ArrowUp,
  ArrowLeft,
  Calendar,
  Target,
  Presentation
} from "lucide-react";
import InvestorCard from "@/components/InvestorCard";
import AIAssistant from "@/components/AIAssistant";
import PitchCreator from "@/components/PitchCreator";

const FounderDashboard = () => {
  const navigate = useNavigate();
  const [showPitchCreator, setShowPitchCreator] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Mock data for investors
  const investors = [
    {
      id: 1,
      name: "Venture Capital Partners",
      type: "VC Fund",
      focus: ["CleanTech", "HealthTech", "AI"],
      checkSize: "$1M - $5M",
      stage: ["Series A", "Series B"],
      location: "Silicon Valley, CA",
      portfolio: 42,
      matched: true,
      aiScore: 95,
      partnerName: "Sarah Johnson"
    },
    {
      id: 2,
      name: "Angel Investor Network",
      type: "Angel Group",
      focus: ["EdTech", "Fintech", "SaaS"],
      checkSize: "$25K - $250K",
      stage: ["Pre-Seed", "Seed"],
      location: "New York, NY",
      portfolio: 18,
      matched: false,
      aiScore: 87,
      partnerName: "Michael Chen"
    },
    {
      id: 3,
      name: "Innovation Fund",
      type: "Corporate VC",
      focus: ["Deep Tech", "AI", "Robotics"],
      checkSize: "$500K - $3M",
      stage: ["Seed", "Series A"],
      location: "Boston, MA",
      portfolio: 29,
      matched: true,
      aiScore: 91,
      partnerName: "Dr. Lisa Rodriguez"
    }
  ];

  // Mock pitch data
  const currentPitch = {
    name: "EcoTech Solutions",
    stage: "Series A",
    fundingGoal: 2500000,
    raised: 1750000,
    description: "Revolutionary solar panel technology that increases efficiency by 40%",
    views: 128,
    interested: 23,
    meetings: 5
  };

  const fundingProgress = (currentPitch.raised / currentPitch.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Founder Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Sarah Chen</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Messages (7)
              </Button>
              <Button 
                onClick={() => setShowPitchCreator(true)}
                className="bg-gradient-accent hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Pitch
              </Button>
            </div>
          </div>
        </div>
      </header>

        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard-selection')}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard Selection
        </Button>

      <div className="container mx-auto px-6 py-8">
        {/* Funding Progress */}
        <Card className="bg-gradient-card shadow-soft mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Current Campaign: {currentPitch.name}</h3>
                <p className="text-muted-foreground">{currentPitch.description}</p>
              </div>
              <Badge variant="secondary" className="text-primary">
                {currentPitch.stage}
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Funding Progress</span>
                <span className="text-card-foreground font-medium">
                  ${(currentPitch.raised / 1000000).toFixed(1)}M of ${(currentPitch.fundingGoal / 1000000).toFixed(1)}M
                </span>
              </div>
              <Progress value={fundingProgress} className="h-3" />
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-card-foreground">{currentPitch.views}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-card-foreground">{currentPitch.interested}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Interested</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Calendar className="w-4 h-4 text-warning" />
                    <span className="font-semibold text-card-foreground">{currentPitch.meetings}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Meetings</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Raised</p>
                  <p className="text-2xl font-bold text-card-foreground">₹0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Target className="w-4 h-4 text-accent mr-1" />
                <span className="text-accent">0%</span>
                <span className="text-muted-foreground ml-1">of goal</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Investor Matches</p>
                  <p className="text-2xl font-bold text-card-foreground">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-accent mr-1" />
                <span className="text-accent">+0</span>
                <span className="text-muted-foreground ml-1">this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pitch Views</p>
                  <p className="text-2xl font-bold text-card-foreground">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Presentation className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-accent mr-1" />
                <span className="text-accent">+0</span>
                <span className="text-muted-foreground ml-1">today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Conversations</p>
                  <p className="text-2xl font-bold text-card-foreground">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Calendar className="w-4 h-4 text-warning mr-1" />
                <span className="text-warning">0</span>
                <span className="text-muted-foreground ml-1">meetings scheduled</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="investors" className="space-y-8">
          <TabsList className="grid w-full md:w-fit grid-cols-3">
            <TabsTrigger value="investors">Investors</TabsTrigger>
            <TabsTrigger value="pitch">My Pitch</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="investors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Matched Investors</h3>
              <Button variant="outline" size="sm">View All Matches</Button>
            </div>
            
            <div className="grid gap-6">
              {investors.map(investor => (
                <InvestorCard key={investor.id} investor={investor} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pitch" className="space-y-6">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Pitch Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Presentation className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Pitch editor coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Message center coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating AI Assistant Button */}
      {!showAIAssistant && (
        <Button
          onClick={() => setShowAIAssistant(true)}
          className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-gradient-primary hover:opacity-90 shadow-lg z-40 p-0"
        >
          <Brain className="w-5 h-5 text-primary-foreground" />
        </Button>
      )}

      {/* AI Assistant Popup */}
      {showAIAssistant && (
        <AIAssistant 
          type="founder" 
          onClose={() => setShowAIAssistant(false)} 
        />
      )}

      {showPitchCreator && (
        <PitchCreator onClose={() => setShowPitchCreator(false)} />
      )}
    </div>
  );
};

export default FounderDashboard;