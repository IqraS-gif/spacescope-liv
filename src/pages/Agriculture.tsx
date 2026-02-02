import CropHealthLens from "@/components/CropHealthLens";
import { Leaf, Satellite, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DASHBOARD_URL = "https://spacescope-live.vercel.app/dashboard";

const Agriculture = () => {
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
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shadow-[0_0_15px_hsl(142_76%_36%/0.3)]">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Food Security</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Agriculture Monitor</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/disaster" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Satellite className="w-4 h-4" />
              Disaster Relief
            </Link>
            <Link to="/agriculture" className="text-sm text-green-400 font-medium flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Crop Health
            </Link>
            <Link to="/climate" className="text-sm text-muted-foreground hover:text-orange-400 transition-colors flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Climate History
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">MONITORING</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Page intro */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Leaf className="w-5 h-5 text-green-400" />
            <span className="text-sm text-muted-foreground">
              Satellite Intelligence for Global Food Security
            </span>
          </div>

          {/* Main Component */}
          <CropHealthLens />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Agriculture & Food Security Module
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Agriculture;
