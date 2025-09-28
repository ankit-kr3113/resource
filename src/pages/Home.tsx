import HeroSection from "@/components/HeroSection";
import { BookOpen, FileText, Upload, FolderTree, Globe, Heart, ShieldCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Highlights */}
      <section className="py-16 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Resource Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 bg-card rounded-xl shadow-soft border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vast, Organized Library</h3>
              <p className="text-muted-foreground">Notes, PYQs, lab manuals, and curated links—organized by branch, year, and subject.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-soft border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality & Relevance</h3>
              <p className="text-muted-foreground">Community‑curated resources from students and alumni, kept up to date.</p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl shadow-soft border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Made for NITians</h3>
              <p className="text-muted-foreground">Purpose‑built for NIT courses and exam patterns across semesters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <Button variant="link" asChild>
              <a href="/browse">View all</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/browse?category=notes" className="group bg-card rounded-xl p-6 border border-border hover:shadow-medium transition-smooth">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <BookOpen />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Notes</h3>
              <p className="text-sm text-muted-foreground">Well‑structured notes for quick revision and deep learning.</p>
            </a>
            <a href="/browse?category=pyq" className="group bg-card rounded-xl p-6 border border-border hover:shadow-medium transition-smooth">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <FileText />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Previous Year Questions</h3>
              <p className="text-sm text-muted-foreground">PYQs with solutions to understand trends and scoring patterns.</p>
            </a>
            <a href="/browse?category=links" className="group bg-card rounded-xl p-6 border border-border hover:shadow-medium transition-smooth">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Globe />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Curated Links</h3>
              <p className="text-sm text-muted-foreground">Handpicked videos, articles, and tutorials that actually help.</p>
            </a>
            <a href="/browse?category=lab" className="group bg-card rounded-xl p-6 border border-border hover:shadow-medium transition-smooth">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <FolderTree />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Lab Manuals</h3>
              <p className="text-sm text-muted-foreground">Experiment guides, procedures, and viva questions.</p>
            </a>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-accent/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <div className="text-4xl font-extrabold text-primary mb-3">1</div>
              <h3 className="font-semibold mb-2">Browse & search</h3>
              <p className="text-muted-foreground">Find resources by branch, year, subject, or keyword with smart filters.</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <div className="text-4xl font-extrabold text-primary mb-3">2</div>
              <h3 className="font-semibold mb-2">Preview & download</h3>
              <p className="text-muted-foreground">Open, evaluate, and download what you need in a couple of clicks.</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <div className="text-4xl font-extrabold text-primary mb-3">3</div>
              <h3 className="font-semibold mb-2">Contribute back</h3>
              <p className="text-muted-foreground">Upload your notes or links and help the next batch succeed.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="hero" size="lg" asChild>
              <a href="/submit"><Upload className="mr-2" /> Submit a Resource</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-soft">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Built with love by the community</h3>
                <p className="text-muted-foreground mb-4">Hundreds of contributors have shared their best material. Join in and keep the knowledge flowing.</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><Heart className="w-4 h-4 text-red-500" /> 200+ contributors</span>
                  <span className="inline-flex items-center gap-2"><BookOpen className="w-4 h-4" /> 1,250+ resources</span>
                  <span className="inline-flex items-center gap-2"><FileText className="w-4 h-4" /> 400+ PYQs</span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <Button size="lg" asChild>
                  <a href="/browse">Start browsing</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
