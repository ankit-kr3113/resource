import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Menu, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const nav = [
    { label: "Home", to: "/" },
    { label: "Browse", to: "/browse" },
    { label: "Submit", to: "/submit" },
    { label: "About", to: "/about" },
  ];

  const isActive = (to: string) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to));

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-soft ${
        isScrolled
          ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-border/60"
          : "bg-background border-border"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        {/* Brand Row */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-soft">
              <BookOpen className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-foreground tracking-tight">Resource Hub</div>
              <div className="text-xs text-muted-foreground">Your Academic Resource Platform</div>
            </div>
          </Link>
        </div>

        {/* Maroon Nav Bar */}
        <div className="mt-3 bg-primary rounded-xl shadow-medium">
          <div className="flex items-center justify-between gap-2 px-2 md:px-3 py-2">
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-md text-sm transition-smooth text-primary-foreground hover:bg-primary/60 ${
                    isActive(item.to) ? "bg-primary/70" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile burger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="secondary" size="sm" className="h-8 px-3" asChild>
                <Link to="/submit">
                  <Upload className="w-4 h-4 mr-2" /> Submit
                </Link>
              </Button>
              <Button variant="secondary" size="sm" className="h-8 px-3" asChild>
                <Link to="#">
                  <User className="w-4 h-4 mr-2" /> Sign In
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu inside maroon bar */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-primary-hover/50 px-2 py-3 space-y-2">
              <div className="flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-2.5 py-2 rounded-md text-sm transition-smooth text-primary-foreground/95 ${
                      isActive(item.to) ? "bg-primary/70" : "hover:bg-primary/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button variant="secondary" className="w-full h-9" asChild>
                  <Link to="/submit">
                    <Upload className="w-4 h-4 mr-2" /> Submit
                  </Link>
                </Button>
                <Button variant="secondary" className="w-full h-9" asChild>
                  <Link to="#">
                    <User className="w-4 h-4 mr-2" /> Sign In
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
