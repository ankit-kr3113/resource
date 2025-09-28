import { useNavigate } from "react-router-dom";
import { BookOpen, FileText, ExternalLink, Users, Monitor, TrendingUp, Wrench, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="gradient-subtle py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Streamlined learning for every branch & year
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-5">
            Resource Hub for NIT Students
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover notes, previous year questions, lab manuals, and curated links. Organized by branch, year, and subject—contributed by students for students.
          </p>

          {/* Primary CTAs */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-12">
            <Button variant="hero" size="lg" onClick={() => navigate("/browse")}>
              Browse Resources
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/submit")}>
              Submit a Resource
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Student‑led</div>
            <div className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Free & open</div>
            <div className="inline-flex items-center gap-2"><Users className="w-4 h-4" /> Community curated</div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">1,250+</div>
              <div className="text-sm text-muted-foreground">Resources</div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mb-3 mx-auto">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">850+</div>
              <div className="text-sm text-muted-foreground">Notes</div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3 mx-auto">
                <ExternalLink className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">400+</div>
              <div className="text-sm text-muted-foreground">PYQs</div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3 mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">200+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>

          {/* Browse Categories */}
          <div className="text-center mt-12">
            <h2 className="text-base font-semibold text-foreground mb-4">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={() => navigate("/browse?category=notes")} className="hover:bg-primary hover:text-primary-foreground">
                <BookOpen className="w-4 h-4 mr-2" />Notes
              </Button>
              <Button variant="outline" onClick={() => navigate("/browse?category=pyq")} className="hover:bg-primary hover:text-primary-foreground">
                <FileText className="w-4 h-4 mr-2" />Previous Year Questions
              </Button>
              <Button variant="outline" onClick={() => navigate("/browse?category=links")} className="hover:bg-primary hover:text-primary-foreground">
                <ExternalLink className="w-4 h-4 mr-2" />External Links
              </Button>
              <Button variant="outline" onClick={() => navigate("/browse?branch=cse")} className="hover:bg-primary hover:text-primary-foreground">
                <Monitor className="w-4 h-4 mr-2" />Computer Science
              </Button>
              <Button variant="outline" onClick={() => navigate("/browse?branch=eee")} className="hover:bg-primary hover:text-primary-foreground">
                <TrendingUp className="w-4 h-4 mr-2" />Electrical Engineering
              </Button>
              <Button variant="outline" onClick={() => navigate("/browse?branch=me")} className="hover:bg-primary hover:text-primary-foreground">
                <Wrench className="w-4 h-4 mr-2" />Mechanical Engineering
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
