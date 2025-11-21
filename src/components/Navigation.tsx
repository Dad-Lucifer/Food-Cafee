import { NavLink } from "@/components/NavLink";
import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeSection?: string;
}

const Navigation = ({ activeSection = '' }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
            Waffles Land
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
              activeClassName="text-primary"
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className="text-foreground hover:text-primary transition-colors font-medium"
              activeClassName="text-primary"
            >
              Menu
            </NavLink>
            <a
              href="/#gallery"
              className={`text-foreground hover:text-primary transition-colors font-medium ${activeSection === 'gallery' ? 'text-primary' : ''
                }`}
            >
              Gallery
            </a>
            <a
              href="/#booking"
              className={`text-foreground hover:text-primary transition-colors font-medium ${activeSection === 'booking' ? 'text-primary' : ''
                }`}
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                activeClassName="text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className="text-foreground hover:text-primary transition-colors font-medium"
                activeClassName="text-primary"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </NavLink>
              <a
                href="/#gallery"
                className={`text-foreground hover:text-primary transition-colors font-medium ${activeSection === 'gallery' ? 'text-primary' : ''
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </a>
              <a
                href="/#booking"
                className={`text-foreground hover:text-primary transition-colors font-medium ${activeSection === 'booking' ? 'text-primary' : ''
                  }`}
                onClick={() => setIsOpen(false)}
              >
                Book a Table
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
