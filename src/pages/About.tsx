import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Users, Target, Heart, ShieldCheck, Rocket, Search, Upload, Award, CheckCircle2, Sparkles, Globe, Server } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 mb-4">About</Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Resource Hub for Students</h1>
            <p className="mt-3 text-primary-foreground/90 text-lg">A community-driven platform to discover, share, and manage academic resources across branches and semesters.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="bg-white/90 text-primary">1,250+ Resources</Badge>
              <Badge className="bg-white/90 text-primary">500+ Contributors</Badge>
              <Badge className="bg-white/90 text-primary">25+ Subjects</Badge>
            </div>
            <div className="mt-6 flex gap-3">
              <Button asChild><Link to="/browse"><Search className="w-4 h-4 mr-2"/>Browse Resources</Link></Button>
              <Button variant="secondary" asChild><Link to="/submit"><Upload className="w-4 h-4 mr-2"/>Submit a Resource</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Resource Hub */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><BookOpen className="w-6 h-6 text-primary"/></div>
                <CardTitle className="text-lg">Curated Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Notes, PYQs, and other helpful references organized by branch and semester.</CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><Users className="w-6 h-6 text-primary"/></div>
                <CardTitle className="text-lg">Community First</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Built by students and reviewed by peers to keep content relevant and trustworthy.</CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><Target className="w-6 h-6 text-primary"/></div>
                <CardTitle className="text-lg">Designed for Speed</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Clean UX, fast search, and clear categorization help you find what you need quickly.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><Search className="w-5 h-5 text-primary"/>Browse</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Pick your branch and semester to explore subjects and resources with filters and counts.</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><Upload className="w-5 h-5 text-primary"/>Contribute</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Share your notes, PYQs, or other helpful links. Admins verify before publishing.</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary"/>Moderate</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">Admins review pending submissions. Super-admins manage roles and system-wide settings.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why contribute */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-2">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Award className="w-5 h-5 text-primary"/>Recognition</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Showcase your work and get credit as a contributor.</CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Heart className="w-5 h-5 text-primary"/>Give Back</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Help classmates succeed and strengthen the academic community.</CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Rocket className="w-5 h-5 text-primary"/>Level Up</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Improve your understanding by organizing and sharing resources.</CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary"/>Quality</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Peer review helps keep materials high-quality and up-to-date.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="border rounded-lg bg-card/60 backdrop-blur">
            <AccordionItem value="item-1" className="px-4">
              <AccordionTrigger>Who can contribute?</AccordionTrigger>
              <AccordionContent>Any signed-in contributor can submit. Admins verify and approve before publishing.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="px-4">
              <AccordionTrigger>What file types are allowed?</AccordionTrigger>
              <AccordionContent>Currently PDF, DOCX, and PPTX are supported for uploads. External links are categorized as Other.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="px-4">
              <AccordionTrigger>How are roles managed?</AccordionTrigger>
              <AccordionContent>Admins handle moderation. Super-admins can manage roles and view system snapshots.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Tech & Principles */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Globe className="w-5 h-5 text-primary"/>Open Access</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">Free to browse and contribute within community guidelines.</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Server className="w-5 h-5 text-primary"/>Privacy First</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">We store only what’s needed for contributions and moderation.</CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary"/>Continuous Improvement</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">New features like bookmarks, leaderboards, and history are planned.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Be part of the Resource Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Start by browsing your branch and semester, or submit a helpful resource to support your peers.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button asChild><Link to="/browse"><Search className="w-4 h-4 mr-2"/>Start Browsing</Link></Button>
            <Button variant="outline" asChild><Link to="/submit"><Upload className="w-4 h-4 mr-2"/>Contribute Now</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
