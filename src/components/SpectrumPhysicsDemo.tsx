import { useState } from "react";
import { Leaf, Sun, Satellite, AlertTriangle, CheckCircle } from "lucide-react";

const SpectrumPhysicsDemo = () => {
  const [isHealthy, setIsHealthy] = useState(true);

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-display font-semibold text-foreground mb-1">How Plants Talk to Satellites</h3>
        <p className="text-xs text-muted-foreground">Near-Infrared Reflectance</p>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setIsHealthy(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
            isHealthy 
              ? "bg-green-500/20 text-green-400 border border-green-500/50" 
              : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
          }`}
        >
          Healthy Leaf
        </button>
        <button
          onClick={() => setIsHealthy(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
            !isHealthy 
              ? "bg-destructive/20 text-destructive border border-destructive/50" 
              : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
          }`}
        >
          Stressed Leaf
        </button>
      </div>

      {/* SVG Animation Scene */}
      <div className="relative h-64 bg-gradient-to-b from-background/50 to-card/50 rounded-lg border border-border/50 overflow-hidden">
        {/* Sun */}
        <div className="absolute top-4 left-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
            isHealthy ? "bg-yellow-500/20" : "bg-yellow-500/10"
          }`}>
            <Sun className="w-5 h-5 text-yellow-400" />
          </div>
        </div>

        {/* Satellite */}
        <div className="absolute top-4 right-4">
          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
            isHealthy 
              ? "bg-green-500/20 shadow-[0_0_15px_hsl(142_76%_36%/0.4)]" 
              : "bg-destructive/20"
          }`}>
            <Satellite className={`w-6 h-6 transition-colors duration-300 ${
              isHealthy ? "text-green-400" : "text-destructive"
            }`} />
            
            {/* Alert badge */}
            {!isHealthy && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-3 h-3 text-destructive-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* SVG for light waves */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          {/* Sun rays coming down */}
          <g className="animate-fade-in">
            <line x1="40" y1="40" x2="100" y2="120" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            <line x1="50" y1="35" x2="100" y2="120" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          </g>

          {/* NIR reflection path - healthy */}
          {isHealthy && (
            <g>
              {/* NIR wave bouncing to satellite */}
              <path
                d="M100,120 Q120,100 140,80 Q150,70 160,50"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                className="animate-nir-bounce"
                strokeLinecap="round"
              />
              {/* NIR label */}
              <text x="125" y="70" fill="#22c55e" fontSize="8" fontFamily="monospace" className="animate-fade-in">
                NIR
              </text>
            </g>
          )}

          {/* NIR absorbed - stressed */}
          {!isHealthy && (
            <g>
              {/* NIR wave being absorbed */}
              <path
                d="M100,120 Q110,110 105,125"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity="0.5"
                className="animate-fade-in"
                strokeLinecap="round"
              />
              {/* Absorbed indicator */}
              <circle cx="100" cy="125" r="8" fill="#ef4444" opacity="0.3" className="animate-pulse" />
            </g>
          )}
        </svg>

        {/* Leaf */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className={`relative transition-all duration-500`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
              isHealthy 
                ? "bg-green-500/20 shadow-[0_0_20px_hsl(142_76%_36%/0.3)]" 
                : "bg-green-500/10"
            }`}>
              <Leaf className={`w-8 h-8 transition-all duration-300 ${
                isHealthy ? "text-green-400" : "text-green-400/70"
              }`} />
            </div>
            
            {/* Status label */}
            <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono ${
              isHealthy ? "text-green-400" : "text-muted-foreground"
            }`}>
              {isHealthy ? "Reflecting NIR" : "Absorbing NIR"}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 right-4">
          {isHealthy ? (
            <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1 animate-scale-in">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span className="text-xs font-mono text-green-400">STRONG SIGNAL</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-destructive/20 border border-destructive/50 rounded-full px-3 py-1 animate-scale-in">
              <AlertTriangle className="w-3 h-3 text-destructive" />
              <span className="text-xs font-mono text-destructive">LOW REFLECTANCE</span>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
        {isHealthy 
          ? "Healthy chloroplasts reflect Near-Infrared strongly — satellites see bright returns."
          : "Stressed cells absorb NIR instead of reflecting it — satellites detect the drop early."
        }
      </p>
    </div>
  );
};

export default SpectrumPhysicsDemo;
