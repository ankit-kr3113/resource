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
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shadow-soft">
              <BookOpen className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-foreground tracking-tight">Resource Hub</div>
              <div className="text-xs text-muted-foreground">Academic resources for NIT students</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-md text-sm transition-smooth hover:bg-accent hover:text-accent-foreground ${
                  isActive(item.to) ? "text-primary bg-primary/10" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="hidden md:inline-flex h-9 px-3" asChild>
              <Link to="/submit">
                <Upload className="w-4 h-4 mr-2" />
                Submit
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex h-9 px-3" asChild>
              <Link to="#">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 border-t border-border pt-3 space-y-2">
            <div className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-2.5 py-2 rounded-md text-sm transition-smooth ${
                    isActive(item.to) ? "text-primary bg-primary/10" : "text-foreground/80 hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button variant="secondary" className="flex-1" asChild>
                <Link to="/submit">
                  <Upload className="w-4 h-4 mr-2" /> Submit
                </Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="#">
                  <User className="w-4 h-4 mr-2" /> Sign In
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
