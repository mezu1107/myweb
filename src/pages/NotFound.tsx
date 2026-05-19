import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("[v0] 404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-black text-primary mb-2">404</h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" size="lg">
            <a href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </a>
          </Button>

          <Button asChild variant="outline" size="lg">
            <a href="#" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </a>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4">Need help?</p>
          <Button asChild variant="ghost" size="sm">
            <a href="/contact">Contact us</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
