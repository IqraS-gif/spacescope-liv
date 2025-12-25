import { useEffect, useState } from "react";
import { Satellite, Database } from "lucide-react";

const DatacubeDemo = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 6);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  const layers = [
    { year: "1984", color: "bg-blue-500" },
    { year: "1994", color: "bg-cyan-500" },
    { year: "2004", color: "bg-teal-500" },
    { year: "2014", color: "bg-amber-500" },
    { year: "2024", color: "bg-orange-500" },
  ];

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-6 h-full">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-display font-semibold text-foreground mb-1">How We Build History</h3>
        <p className="text-xs text-muted-foreground">The Temporal Datacube</p>
      </div>

      {/* Animation Container */}
      <div 
        className="relative h-56 bg-gradient-to-b from-background/50 to-card/50 rounded-lg border border-border/50 overflow-hidden cursor-pointer"
        onClick={() => setIsAnimating(!isAnimating)}
      >
        {/* Satellite path */}
        <div className="absolute top-4 left-0 right-0 h-8 flex items-center justify-center">
          <div className="relative w-full max-w-[180px]">
            {/* Path line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
            
            {/* Satellite moving */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
              style={{ 
                left: `${(activeLayer / 5) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.5)] animate-pulse">
                <Satellite className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Data drop animation */}
        {isAnimating && (
          <div 
            className="absolute w-1 bg-gradient-to-b from-primary to-transparent transition-all duration-300"
            style={{
              left: `${50 + ((activeLayer / 5) * 20) - 10}%`,
              top: '40px',
              height: '40px',
              opacity: activeLayer % 2 === 0 ? 1 : 0,
            }}
          />
        )}

        {/* Datacube stack - isometric view */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ perspective: '500px' }}>
          <div 
            className="relative"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'rotateX(60deg) rotateZ(-45deg)',
            }}
          >
            {layers.map((layer, index) => (
              <div
                key={layer.year}
                className={`absolute w-20 h-20 rounded-sm border transition-all duration-500 ${
                  index <= activeLayer 
                    ? `${layer.color}/80 border-foreground/20 shadow-lg` 
                    : 'bg-muted/20 border-border/30'
                }`}
                style={{
                  transform: `translateZ(${index * 8}px)`,
                  opacity: index <= activeLayer ? 1 : 0.3,
                }}
              >
                {/* Year label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-[10px] font-mono font-bold transition-colors duration-300 ${
                    index <= activeLayer ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {layer.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-card/80 backdrop-blur-sm border border-border rounded-full px-3 py-1">
            <Database className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground">TEMPORAL DATACUBE</span>
          </div>
        </div>

        {/* Play/Pause indicator */}
        <div className="absolute top-2 right-2">
          <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
        </div>
      </div>

      {/* Explanation */}
      <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
        Satellites layer images over time, allowing us to drill down through history for any specific pixel on Earth.
      </p>

      {/* Click hint */}
      <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
        Click to {isAnimating ? 'pause' : 'play'}
      </p>
    </div>
  );
};

export default DatacubeDemo;
