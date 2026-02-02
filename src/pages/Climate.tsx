import ClimateTimeMachine from "@/components/ClimateTimeMachine";
import { Clock, Satellite, Leaf, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DASHBOARD_URL = "https://spacescope-live.vercel.app/dashboard";

const Climate = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={DASHBOARD_URL}
              className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shadow-[0_0_15px_hsl(25_95%_53%/0.3)]">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Climate Archive</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Historical Analysis</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/disaster" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Satellite className="w-4 h-4" />
              Disaster Relief
            </Link>
            <Link to="/agriculture" className="text-sm text-muted-foreground hover:text-green-400 transition-colors flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Crop Health
            </Link>
            <Link to="/climate" className="text-sm text-orange-400 font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Climate History
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">ARCHIVE ACTIVE</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Page intro */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-muted-foreground">
              52 Years of Earth Observation History
            </span>
          </div>

          {/* Main Component */}
          <ClimateTimeMachine />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Climate Change & Historical Analysis Module
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Climate;
