import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Search, 
  Filter, 
  MessageSquare, 
  Eye, 
  DollarSign, 
  Users, 
  Briefcase,
  Brain,
  Star,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Calendar
} from "lucide-react";
import InvestorCard from "@/components/InvestorCard";
import StartupCard from "@/components/StartupCard";
import AIAssistant from "@/components/AIAssistant";

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for startups
  const startups = [
    {
      id: 1,
      name: "EcoTech Solutions",
      category: "CleanTech",
      stage: "Series A",
      fundingGoal: 2500000,
      raised: 1750000,
      description: "Revolutionary solar panel technology that increases efficiency by 40% while reducing manufacturing costs.",
      founderName: "Sarah Chen",
      location: "San Francisco, CA",
      employees: 25,
      matched: true,
      aiScore: 92
    },
    {
      id: 2,
      name: "HealthAI",
      category: "HealthTech",
      stage: "Seed",
      fundingGoal: 1000000,
      raised: 750000,
      description: "AI-powered diagnostic tool that can detect early-stage diseases with 95% accuracy using smartphone cameras.",
      founderName: "Dr. Michael Rodriguez",
      location: "Boston, MA",
      employees: 12,
      matched: false,
      aiScore: 88
    },
    {
      id: 3,
      name: "EduVerse",
      category: "EdTech",
      stage: "Pre-Seed",
      fundingGoal: 500000,
      raised: 150000,
      description: "Virtual reality platform for immersive educational experiences. Think metaverse for classrooms.",
      founderName: "Alex Kim (Student)",
      location: "Austin, TX",
      employees: 4,
      matched: true,
      aiScore: 75,
      isIdea: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Investor Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, John Investor</p>
              </div>
            </div>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages (3)
            </Button>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold text-card-foreground">₹0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-accent mr-1" />
                <span className="text-accent">+0%</span>
                <span className="text-muted-foreground ml-1">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Investments</p>
                  <p className="text-2xl font-bold text-card-foreground">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-accent mr-1" />
                <span className="text-accent">+0</span>
                <span className="text-muted-foreground ml-1">new this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">AI Matches</p>
                  <p className="text-2xl font-bold text-card-foreground">0</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <Star className="w-4 h-4 text-warning mr-1" />
                <span className="text-warning">0</span>
                <span className="text-muted-foreground ml-1">high priority</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-card-foreground">0%</p>
                </div>
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-accent mr-1" />
                <span className="text-accent">+0%</span>
                <span className="text-muted-foreground ml-1">vs last quarter</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="discover" className="space-y-8">
          <TabsList className="grid w-full md:w-fit grid-cols-3">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search startups, ideas, or founders..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Startup Listings */}
            <div className="grid gap-6">
              {startups.map(startup => (
                <StartupCard key={startup.id} startup={startup} isInvestor={true} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Portfolio management coming soon...</p>
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
          type="investor" 
          onClose={() => setShowAIAssistant(false)} 
        />
      )}
    </div>
  );
};

export default InvestorDashboard;