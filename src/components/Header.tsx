
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from 'react';

interface HeaderProps {
  toggleTheme?: () => void;
  showThemeToggle?: boolean;
}

const Header = ({ toggleTheme, showThemeToggle = false }: HeaderProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (toggleTheme) {
      toggleTheme();
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">Event Horizon</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/spotlight" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Spotlight
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {showThemeToggle && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
