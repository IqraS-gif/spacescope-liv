import { useState, useRef, useEffect } from "react";
import { Leaf, Scan } from "lucide-react";
import healthyFieldImage from "@/assets/healthy-cornfield.jpg";
import heatmapImage from "@/assets/crop-heatmap.jpg";
import SpectrumPhysicsDemo from "./SpectrumPhysicsDemo";
import AgricultureContextCards from "./AgricultureContextCards";

const CropHealthLens = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [lensSize] = useState(150);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
          <Leaf className="w-4 h-4 text-green-400" />
          <span className="text-xs font-display uppercase tracking-widest text-green-400">Crop Health Analysis</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-glow mb-2">
          The Hidden Famine
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Move your cursor over the field to reveal what satellites see beneath the surface
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Magic Lens Container - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden border-2 border-green-500/50 shadow-[0_0_30px_hsl(142_76%_36%/0.2)]">
            {/* Status indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-full px-4 py-1.5 flex items-center gap-2">
                <Scan className={`w-4 h-4 transition-colors duration-300 ${isHovering ? "text-green-400 animate-pulse" : "text-muted-foreground"}`} />
                <span className="text-xs font-mono text-muted-foreground">
                  {isHovering ? "SCANNING..." : "HOVER TO SCAN"}
                </span>
              </div>
            </div>

            {/* Image container with lens effect */}
            <div
              ref={containerRef}
              className="relative h-[350px] md:h-[450px] cursor-crosshair overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onTouchStart={() => setIsHovering(true)}
              onTouchEnd={() => setIsHovering(false)}
              onTouchMove={handleTouchMove}
            >
              {/* Base layer - healthy field */}
              <img
                src={healthyFieldImage}
                alt="Healthy cornfield"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay layer - heatmap (revealed through lens) */}
              <div
                className="absolute inset-0 w-full h-full transition-opacity duration-200"
                style={{
                  opacity: isHovering ? 1 : 0,
                  clipPath: isHovering 
                    ? `circle(${lensSize / 2}px at ${mousePosition.x}px ${mousePosition.y}px)` 
                    : 'circle(0px at 50% 50%)',
                }}
              >
                <img
                  src={heatmapImage}
                  alt="Crop stress heatmap"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lens border ring */}
              {isHovering && (
                <div
                  className="absolute pointer-events-none border-2 border-green-400/80 rounded-full shadow-[0_0_20px_hsl(142_76%_36%/0.5),inset_0_0_20px_hsl(142_76%_36%/0.2)] transition-all duration-75"
                  style={{
                    width: lensSize,
                    height: lensSize,
                    left: mousePosition.x - lensSize / 2,
                    top: mousePosition.y - lensSize / 2,
                  }}
                >
                  {/* Crosshair lines */}
                  <div className="absolute top-1/2 left-0 w-full h-px bg-green-400/30" />
                  <div className="absolute top-0 left-1/2 w-px h-full bg-green-400/30" />
                  
                  {/* Corner markers */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-green-400/60" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-green-400/60" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-green-400/60" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-green-400/60" />
                </div>
              )}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-3 py-2">
                  <p className="text-xs font-mono text-muted-foreground mb-2">NDVI Legend</p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-destructive">Stressed</span>
                    <span className="text-[10px] text-green-400">Healthy</span>
                  </div>
                </div>
              </div>

              {/* Scan info badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-3 py-2">
                  <p className="text-xs font-mono text-muted-foreground">Sentinel-2 MSI</p>
                  <p className="text-[10px] text-green-400">10m Resolution</p>
                </div>
              </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Physics Demo - Takes 1 column */}
        <div className="lg:col-span-1">
          <SpectrumPhysicsDemo />
        </div>
      </div>

      {/* Context Cards */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12 bg-border" />
          <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">Why It Matters</span>
          <div className="h-px w-12 bg-border" />
        </div>
        <AgricultureContextCards />
      </div>

      {/* Stats Section */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/5 to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">Precision Agriculture</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Early Warning System</p>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            By detecting crop stress before it's visible to farmers, satellite imagery enables 
            <span className="text-green-400 font-medium"> precision intervention</span> — 
            targeting only affected areas with water, fertilizer, or pesticides, saving resources and preventing crop loss.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-green-400" style={{ textShadow: '0 0 20px hsl(142 76% 36% / 0.6)' }}>14</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Days Early Warning</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-display font-bold text-green-400" style={{ textShadow: '0 0 20px hsl(142 76% 36% / 0.6)' }}>30%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Water Savings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-green-400" style={{ textShadow: '0 0 20px hsl(142 76% 36% / 0.6)' }}>$2B+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Crop Loss Prevented</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropHealthLens;
