import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  ArrowLeft, 
  Users, 
  Upload,
  X,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

const InvestorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profilePicture: null as File | null,
    investorType: "",
    investmentSectors: [] as string[],
    stagePreferences: [] as string[]
  });

  const [newSector, setNewSector] = useState("");
  const [newStage, setNewStage] = useState("");

  const investorTypes = [
    "Angel Investor",
    "Venture Capital",
    "Family Office",
    "Corporate Investor",
    "Others"
  ];

  const sectors = [
    "AI/ML", "Blockchain", "CleanTech", "EdTech", "FinTech", "HealthTech", 
    "SaaS", "Marketplace", "Hardware", "Biotech", "E-commerce", "Gaming"
  ];

  const stages = [
    "Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Growth", "Late Stage"
  ];

  const addSector = (sector: string) => {
    if (sector && !formData.investmentSectors.includes(sector)) {
      setFormData({
        ...formData,
        investmentSectors: [...formData.investmentSectors, sector]
      });
    }
    setNewSector("");
  };

  const removeSector = (sectorToRemove: string) => {
    setFormData({
      ...formData,
      investmentSectors: formData.investmentSectors.filter(sector => sector !== sectorToRemove)
    });
  };

  const addStage = (stage: string) => {
    if (stage && !formData.stagePreferences.includes(stage)) {
      setFormData({
        ...formData,
        stagePreferences: [...formData.stagePreferences, stage]
      });
    }
    setNewStage("");
  };

  const removeStage = (stageToRemove: string) => {
    setFormData({
      ...formData,
      stagePreferences: formData.stagePreferences.filter(stage => stage !== stageToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Since we don't have a database, we'll just navigate to the dashboard
    navigate("/investor-dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">InnoVest</span>
            </Link>
            <Link to="/dashboard-selection">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Investor Registration</h1>
          <p className="text-muted-foreground">Create your investor profile to discover amazing opportunities</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Profile */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Investment Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="investorType">Type of Investor *</Label>
                <Select value={formData.investorType} onValueChange={(value) => setFormData({...formData, investorType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select investor type" />
                  </SelectTrigger>
                  <SelectContent>
                    {investorTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Investment Sectors of Interest</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Select value={newSector} onValueChange={setNewSector}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    onClick={() => addSector(newSector)}
                    disabled={!newSector}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.investmentSectors.map((sector, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      {sector}
                      <button 
                        type="button"
                        onClick={() => removeSector(sector)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Investment Stage Preferences</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Select value={newStage} onValueChange={setNewStage}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select stages" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    onClick={() => addStage(newStage)}
                    disabled={!newStage}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.stagePreferences.map((stage, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      {stage}
                      <button 
                        type="button"
                        onClick={() => removeStage(stage)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 shadow-medium">
            Create Investor Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InvestorLogin;