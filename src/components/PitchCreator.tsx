import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Plus,
  Upload,
  DollarSign,
  Users,
  Target,
  Lightbulb,
  TrendingUp,
  Save,
  Send
} from "lucide-react";

interface PitchCreatorProps {
  onClose: () => void;
}

const PitchCreator = ({ onClose }: PitchCreatorProps) => {
  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    category: "",
    stage: "",
    fundingGoal: "",
    description: "",
    problem: "",
    solution: "",
    market: "",
    traction: "",
    team: "",
    financials: "",
    useOfFunds: ""
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const categories = [
    "AI/ML", "Blockchain", "CleanTech", "EdTech", "FinTech", "HealthTech", 
    "SaaS", "Marketplace", "Hardware", "Biotech", "Other"
  ];

  const stages = [
    "Idea Stage", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+"
  ];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create New Pitch</h2>
            <p className="text-muted-foreground">Share your vision with potential investors</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-accent" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input 
                    id="tagline"
                    placeholder="One-line description of your company"
                    value={formData.tagline}
                    onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stage">Funding Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({...formData, stage: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
                  <Input 
                    id="fundingGoal"
                    type="number"
                    placeholder="500000"
                    value={formData.fundingGoal}
                    onChange={(e) => setFormData({...formData, fundingGoal: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Provide a brief overview of your company and what you do..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Problem & Solution */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Problem & Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="problem">Problem Statement</Label>
                <Textarea 
                  id="problem"
                  placeholder="What problem are you solving? Who has this problem?"
                  rows={3}
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="solution">Your Solution</Label>
                <Textarea 
                  id="solution"
                  placeholder="How does your product/service solve this problem?"
                  rows={3}
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Market & Traction */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                Market & Traction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="market">Market Opportunity</Label>
                <Textarea 
                  id="market"
                  placeholder="Describe your target market size and opportunity..."
                  rows={3}
                  value={formData.market}
                  onChange={(e) => setFormData({...formData, market: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="traction">Traction & Metrics</Label>
                <Textarea 
                  id="traction"
                  placeholder="Share key metrics, customers, revenue, growth rates..."
                  rows={3}
                  value={formData.traction}
                  onChange={(e) => setFormData({...formData, traction: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Team & Financials */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Team & Use of Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="team">Team</Label>
                <Textarea 
                  id="team"
                  placeholder="Introduce your founding team and key members..."
                  rows={3}
                  value={formData.team}
                  onChange={(e) => setFormData({...formData, team: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="useOfFunds">Use of Funds</Label>
                <Textarea 
                  id="useOfFunds"
                  placeholder="How will you use the investment? (e.g., 60% product development, 25% marketing, 15% team expansion)"
                  rows={3}
                  value={formData.useOfFunds}
                  onChange={(e) => setFormData({...formData, useOfFunds: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Tags & Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-3">
                <Input 
                  placeholder="Add tags (e.g., AI, sustainability, B2B)"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center">
                    {tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-gradient-accent hover:opacity-90">
              <Send className="w-4 h-4 mr-2" />
              Publish Pitch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchCreator;