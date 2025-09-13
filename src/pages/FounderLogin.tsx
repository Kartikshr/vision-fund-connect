import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  ArrowLeft, 
  Zap, 
  X,
  Plus,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";

const FounderLogin = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  
  // Sign in form
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  
  // Sign up form
  const [formData, setFormData] = useState({
    // Basic Information
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Company Information
    companyName: "",
    industry: "",
    startupStage: "",
    location: "",
    companyDescription: "",
    website: "",
    linkedin: "",
    otherLinks: "",
    
    // Funding Details
    amountRaised: "",
    fundingRequired: "",
    keyInvestors: "",
    
    // Team Information
    teamSize: "",
    keyMembers: "",
    
    // Goals & Interests
    investorTypes: [] as string[],
    preferredInvestmentSize: "",
    targetGeographies: [] as string[]
  });

  const [newInvestorType, setNewInvestorType] = useState("");
  const [newGeography, setNewGeography] = useState("");

  const industries = [
    "AI/ML", "Blockchain", "CleanTech", "EdTech", "FinTech", "HealthTech", 
    "SaaS", "Marketplace", "Hardware", "Biotech", "E-commerce", "Gaming", "Other"
  ];

  const stages = [
    "Idea Stage", "Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Growth"
  ];

  const investorTypeOptions = [
    "Angel Investor", "Venture Capital", "Strategic Investor", "Industry-specific", "Corporate VC"
  ];

  const geographies = [
    "North America", "Europe", "Asia", "South America", "Africa", "Australia", "Global"
  ];

  const addInvestorType = (type: string) => {
    if (type && !formData.investorTypes.includes(type)) {
      setFormData({
        ...formData,
        investorTypes: [...formData.investorTypes, type]
      });
    }
    setNewInvestorType("");
  };

  const removeInvestorType = (typeToRemove: string) => {
    setFormData({
      ...formData,
      investorTypes: formData.investorTypes.filter(type => type !== typeToRemove)
    });
  };

  const addGeography = (geo: string) => {
    if (geo && !formData.targetGeographies.includes(geo)) {
      setFormData({
        ...formData,
        targetGeographies: [...formData.targetGeographies, geo]
      });
    }
    setNewGeography("");
  };

  const removeGeography = (geoToRemove: string) => {
    setFormData({
      ...formData,
      targetGeographies: formData.targetGeographies.filter(geo => geo !== geoToRemove)
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn(signInData.email, signInData.password);
      navigate("/founder-dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        phone: formData.phone,
        userType: 'founder',
        companyName: formData.companyName,
        industry: formData.industry,
        startupStage: formData.startupStage,
        location: formData.location,
        companyDescription: formData.companyDescription,
        website: formData.website,
        linkedin: formData.linkedin,
        otherLinks: formData.otherLinks,
        amountRaised: formData.amountRaised,
        fundingRequired: formData.fundingRequired,
        keyInvestors: formData.keyInvestors,
        teamSize: formData.teamSize,
        keyMembers: formData.keyMembers,
        investorTypes: formData.investorTypes,
        preferredInvestmentSize: formData.preferredInvestmentSize,
        targetGeographies: formData.targetGeographies,
      });
      navigate("/founder-dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
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
          <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Founder Registration</h1>
          <p className="text-muted-foreground">Create your founder profile to connect with investors</p>
        </div>

        <Tabs value={isSignUp ? "signup" : "signin"} onValueChange={(value) => setIsSignUp(value === "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-6">
              <Card className="bg-gradient-card shadow-soft">
                <CardHeader>
                  <CardTitle>Sign In to Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email Address</Label>
                    <Input 
                      id="signin-email"
                      type="email"
                      required
                      value={signInData.email}
                      onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password"
                      type="password"
                      required
                      value={signInData.password}
                      onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                      placeholder="Enter your password"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:opacity-90 shadow-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-8">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input 
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter password (min 6 characters)"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input 
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Your company name"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry / Sector *</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startupStage">Stage of the Startup *</Label>
                <Select value={formData.startupStage} onValueChange={(value) => setFormData({...formData, startupStage: value})}>
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
                <Label htmlFor="location">Location (City, Country) *</Label>
                <Input 
                  id="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="San Francisco, USA"
                />
              </div>

              <div>
                <Label htmlFor="companyDescription">Company Description *</Label>
                <Textarea 
                  id="companyDescription"
                  required
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
                  placeholder="Describe what your company does..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    placeholder="LinkedIn profile"
                  />
                </div>
                <div>
                  <Label htmlFor="otherLinks">Other Links</Label>
                  <Input 
                    id="otherLinks"
                    value={formData.otherLinks}
                    onChange={(e) => setFormData({...formData, otherLinks: e.target.value})}
                    placeholder="Other relevant links"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Details */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Funding Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amountRaised">Amount Raised So Far ($)</Label>
                <Input 
                  id="amountRaised"
                  type="number"
                  value={formData.amountRaised}
                  onChange={(e) => setFormData({...formData, amountRaised: e.target.value})}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="fundingRequired">Funding Required / Target ($) *</Label>
                <Input 
                  id="fundingRequired"
                  type="number"
                  required
                  value={formData.fundingRequired}
                  onChange={(e) => setFormData({...formData, fundingRequired: e.target.value})}
                  placeholder="500000"
                />
              </div>

              <div>
                <Label htmlFor="keyInvestors">Key Investors (if any)</Label>
                <Textarea 
                  id="keyInvestors"
                  value={formData.keyInvestors}
                  onChange={(e) => setFormData({...formData, keyInvestors: e.target.value})}
                  placeholder="List any existing investors..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Team Information */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="teamSize">Team Size *</Label>
                <Input 
                  id="teamSize"
                  type="number"
                  required
                  value={formData.teamSize}
                  onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                  placeholder="5"
                />
              </div>

              <div>
                <Label htmlFor="keyMembers">Key Members' Roles *</Label>
                <Textarea 
                  id="keyMembers"
                  required
                  value={formData.keyMembers}
                  onChange={(e) => setFormData({...formData, keyMembers: e.target.value})}
                  placeholder="CEO - John Doe, CTO - Jane Smith..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Goals & Interests */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle>Goals & Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>What type of investors are you looking for?</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Select value={newInvestorType} onValueChange={setNewInvestorType}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select investor types" />
                    </SelectTrigger>
                    <SelectContent>
                      {investorTypeOptions.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    onClick={() => addInvestorType(newInvestorType)}
                    disabled={!newInvestorType}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.investorTypes.map((type, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      {type}
                      <button 
                        type="button"
                        onClick={() => removeInvestorType(type)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="preferredInvestmentSize">Preferred Investment Size ($)</Label>
                <Input 
                  id="preferredInvestmentSize"
                  value={formData.preferredInvestmentSize}
                  onChange={(e) => setFormData({...formData, preferredInvestmentSize: e.target.value})}
                  placeholder="100000 - 500000"
                />
              </div>

              <div>
                <Label>Geographies you are targeting</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Select value={newGeography} onValueChange={setNewGeography}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select geographies" />
                    </SelectTrigger>
                    <SelectContent>
                      {geographies.map(geo => (
                        <SelectItem key={geo} value={geo}>{geo}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    onClick={() => addGeography(newGeography)}
                    disabled={!newGeography}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.targetGeographies.map((geo, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center">
                      {geo}
                      <button 
                        type="button"
                        onClick={() => removeGeography(geo)}
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

              <Button 
                type="submit" 
                className="w-full bg-gradient-accent hover:opacity-90 shadow-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Founder Profile"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FounderLogin;