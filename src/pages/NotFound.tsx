
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="container flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground">Page not found</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
