import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Submit from "./pages/Submit";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-primary text-primary-foreground mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Resource Hub</h3>
                <p className="text-sm text-primary-foreground/80">
                  Your one-stop destination for academic resources, 
                  notes, and study materials.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><a href="/browse" className="hover:text-primary-foreground transition-colors">Browse Resources</a></li>
                  <li><a href="/submit" className="hover:text-primary-foreground transition-colors">Submit Resource</a></li>
                  <li><a href="/about" className="hover:text-primary-foreground transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary-foreground transition-colors">Help & Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><a href="/browse?category=notes" className="hover:text-primary-foreground transition-colors">Notes</a></li>
                  <li><a href="/browse?category=pyq" className="hover:text-primary-foreground transition-colors">Previous Year Questions</a></li>
                  <li><a href="/browse?category=links" className="hover:text-primary-foreground transition-colors">External Links</a></li>
                  <li><a href="/browse?category=lab" className="hover:text-primary-foreground transition-colors">Lab Manuals</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Community</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><a href="/about" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary-foreground transition-colors">Guidelines</a></li>
                  <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary-foreground transition-colors">Contribute</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-primary-hover mt-8 pt-8 text-center text-sm text-primary-foreground/80">
              <p>&copy; 2024 Resource Hub. All Rights Reserved.</p>
              <p className="mt-1">Built with ❤️ for the academic community</p>
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
