import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Zap, Shield, Brain, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">InnoVest</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard-selection">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/dashboard-selection">
                <Button className="bg-gradient-primary hover:opacity-90">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Where Innovation Meets 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Investment</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            InnoVest bridges the gap between visionary founders and strategic investors. 
            From groundbreaking startups to raw ideas, our AI-powered platform creates 
            meaningful connections that transform possibilities into realities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/investor-login">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium">
                <Users className="mr-2 w-5 h-5" />
                I'm an Investor
              </Button>
            </Link>
            <Link to="/founder-login">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Zap className="mr-2 w-5 h-5" />
                I'm a Founder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Revolutionizing Investment Connections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with human insight to create the perfect ecosystem for innovation funding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">AI-Powered Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our intelligent algorithm analyzes investment patterns, risk profiles, and industry preferences to suggest perfect matches.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Secure Agreements</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automated legal document generation ensures transparent, fair, and legally sound agreements for all parties.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Inclusive Ecosystem</h3>
              <p className="text-muted-foreground leading-relaxed">
                From established startups to student ideas, we democratize access to funding and mentorship opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$2.5B+</div>
              <div className="text-muted-foreground">Total Funding Facilitated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">1,200+</div>
              <div className="text-muted-foreground">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">450+</div>
              <div className="text-muted-foreground">Active Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">89%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Investment Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of investors and founders who are already building the future together.
          </p>
          <Link to="/dashboard-selection">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 shadow-glow">
              Start Your Journey Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">InnoVest</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 InnoVest. Democratizing innovation funding.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;