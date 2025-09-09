import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Zap, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardSelection = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">InnoVest</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Path</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your role to access a personalized dashboard designed for your unique needs.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Investor Dashboard */}
          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-strong transition-all duration-300 group cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Investor Dashboard</CardTitle>
              <p className="text-muted-foreground">Discover, analyze, and fund the next generation of innovations</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Browse curated startups & ideas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">AI-powered investment suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Portfolio tracking & analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Direct founder communication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Automated legal agreements</span>
                </div>
              </div>
              <Link to="/investor-login" className="block">
                <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-medium">
                  Access Investor Dashboard
                  <Users className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Founder Dashboard */}
          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-strong transition-all duration-300 group cursor-pointer">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Zap className="w-10 h-10 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Founder Dashboard</CardTitle>
              <p className="text-muted-foreground">Showcase your vision and connect with the right investors</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Create compelling pitch presentations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">AI-matched investor recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Funding progress tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Investor communication hub</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-card-foreground">Mentorship opportunities</span>
                </div>
              </div>
              <Link to="/founder-login" className="block">
                <Button className="w-full bg-gradient-accent hover:opacity-90 shadow-medium">
                  Access Founder Dashboard
                  <Zap className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            New to InnoVest? Our platform adapts to your experience level with guided onboarding and 24/7 support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelection;