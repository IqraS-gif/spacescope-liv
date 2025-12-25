import { useState } from "react";
import { Satellite, Cloud, Home, CheckCircle, XCircle } from "lucide-react";

const SatelliteBeamDemo = () => {
  const [isRadar, setIsRadar] = useState(false);

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-display font-semibold text-foreground mb-1">Signal Physics</h3>
        <p className="text-xs text-muted-foreground">See how different sensors work</p>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setIsRadar(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
            !isRadar 
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/50" 
              : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
          }`}
        >
          Optical Camera
        </button>
        <button
          onClick={() => setIsRadar(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
            isRadar 
              ? "bg-primary/20 text-primary border border-primary/50" 
              : "bg-secondary text-muted-foreground border border-transparent hover:bg-secondary/80"
          }`}
        >
          Radar Sensor
        </button>
      </div>

      {/* SVG Animation Scene */}
      <div className="relative h-64 bg-gradient-to-b from-background/50 to-card/50 rounded-lg border border-border/50 overflow-hidden">
        {/* Background stars */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-foreground/50 rounded-full"
              style={{
                left: `${10 + (i * 8) % 80}%`,
                top: `${5 + (i * 7) % 25}%`,
              }}
            />
          ))}
        </div>

        {/* Satellite */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
              isRadar ? "bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.5)]" : "bg-amber-500/20"
            }`}>
              <Satellite className={`w-6 h-6 transition-colors duration-300 ${isRadar ? "text-primary" : "text-amber-400"}`} />
            </div>
          </div>
        </div>

        {/* Beam Animation */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          {/* Optical beam - bounces off cloud */}
          {!isRadar && (
            <g className="animate-optical-beam">
              {/* Incoming beam */}
              <line
                x1="100"
                y1="40"
                x2="100"
                y2="85"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-dash-down"
              />
              {/* Bounce effect */}
              <line
                x1="100"
                y1="85"
                x2="130"
                y2="55"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
                className="animate-dash-bounce"
              />
              {/* Blocked indicator */}
              <circle cx="100" cy="90" r="8" fill="#ef4444" opacity="0.3" className="animate-pulse" />
            </g>
          )}

          {/* Radar beam - passes through */}
          {isRadar && (
            <g>
              {/* Sine wave path going down */}
              <path
                d="M100,40 Q110,50 100,60 Q90,70 100,80 Q110,90 100,100 Q90,110 100,120 Q110,130 100,140 Q90,150 100,160"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="animate-wave-down"
                strokeLinecap="round"
              />
              {/* Return wave */}
              <path
                d="M100,160 Q90,150 100,140 Q110,130 100,120 Q90,110 100,100 Q110,90 100,80 Q90,70 100,60 Q110,50 100,40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                opacity="0.5"
                className="animate-wave-up"
                strokeLinecap="round"
              />
              {/* Signal received indicator */}
              <circle cx="100" cy="160" r="6" fill="hsl(var(--primary))" opacity="0.5" className="animate-pulse" />
            </g>
          )}
        </svg>

        {/* Cloud */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10">
          <div className={`relative transition-all duration-500 ${isRadar ? "opacity-40" : "opacity-90"}`}>
            <div className="w-20 h-12 bg-gradient-to-b from-slate-300/80 to-slate-400/60 rounded-full blur-sm" />
            <div className="absolute top-1 left-3 w-14 h-8 bg-slate-200/70 rounded-full blur-sm" />
            <Cloud className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-slate-300/80" />
          </div>
        </div>

        {/* House/Ground */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
            isRadar 
              ? "bg-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.4)]" 
              : "bg-secondary"
          }`}>
            <Home className={`w-5 h-5 transition-colors duration-300 ${isRadar ? "text-primary" : "text-muted-foreground"}`} />
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 right-4">
          {isRadar ? (
            <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1 animate-scale-in">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span className="text-xs font-mono text-green-400">DATA RECEIVED</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-destructive/20 border border-destructive/50 rounded-full px-3 py-1 animate-scale-in">
              <XCircle className="w-3 h-3 text-destructive" />
              <span className="text-xs font-mono text-destructive">BLOCKED</span>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
        {isRadar 
          ? "Microwaves (3cm wavelength) pass through water droplets like they aren't there."
          : "Visible light (0.0005mm) bounces off tiny water droplets in clouds."
        }
      </p>
    </div>
  );
};

export default SatelliteBeamDemo;
