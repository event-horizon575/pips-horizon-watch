
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">Event Horizon</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Created by OnlyPips &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
