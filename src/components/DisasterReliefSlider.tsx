import { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import opticalViewImage from "@/assets/optical-view-clouds.jpg";
import radarViewImage from "@/assets/radar-view-flood.jpg";
import { Satellite, Radio, AlertTriangle } from "lucide-react";
import WhyItMattersCards from "./WhyItMattersCards";
import SatelliteBeamDemo from "./SatelliteBeamDemo";

const CustomHandle = () => {
  return (
    <div className="relative h-full flex items-center justify-center">
      {/* Scanner line */}
      <div className="w-1 h-full scanner-line animate-scan-line" />
      
      {/* Center grip */}
      <div className="absolute w-12 h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center glow-cyan cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-110">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      
      {/* Arrow indicators */}
      <div className="absolute left-0 -translate-x-6 text-primary text-xl animate-pulse">‹</div>
      <div className="absolute right-0 translate-x-6 text-primary text-xl animate-pulse">›</div>
    </div>
  );
};

const ImageLabel = ({ 
  label, 
  sublabel, 
  icon: Icon, 
  position 
}: { 
  label: string; 
  sublabel: string; 
  icon: React.ElementType; 
  position: "left" | "right"; 
}) => {
  return (
    <div 
      className={`absolute top-4 ${position === "left" ? "left-4" : "right-4"} z-10`}
    >
      <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-4 py-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{sublabel}</p>
          <p className="text-sm font-display font-semibold text-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};

const DisasterReliefSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const radarActive = sliderPosition > 60;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-4">
          <Satellite className="w-4 h-4 text-primary" />
          <span className="text-xs font-display uppercase tracking-widest text-primary">Earth Observation System</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-glow mb-2">
          Disaster Relief X-Ray Vision
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Drag the slider to reveal how radar technology penetrates storm clouds
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slider Container - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/50 glow-cyan animate-border-pulse">
            {/* Status indicators */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-full px-4 py-1.5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${radarActive ? "bg-primary animate-pulse" : "bg-green-500 animate-pulse"}`} />
                <span className="text-xs font-mono text-muted-foreground">
                  {radarActive ? "RADAR ACTIVE" : "OPTICAL MODE"}
                </span>
              </div>
            </div>

            <ReactCompareSlider
              handle={<CustomHandle />}
              onPositionChange={setSliderPosition}
              itemOne={
                <div className="relative w-full h-full">
                  <ImageLabel 
                    label="Optical View" 
                    sublabel="Blocked" 
                    icon={AlertTriangle} 
                    position="left" 
                  />
                  <ReactCompareSliderImage
                    src={opticalViewImage}
                    alt="Optical satellite view blocked by clouds"
                    className="w-full h-full object-cover"
                  />
                  {/* Cloud overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-foreground/5" />
                </div>
              }
              itemTwo={
                <div className="relative w-full h-full">
                  <ImageLabel 
                    label="Radar View" 
                    sublabel="Clear" 
                    icon={Radio} 
                    position="right" 
                  />
                  <ReactCompareSliderImage
                    src={radarViewImage}
                    alt="SAR radar view showing flood mapping"
                    className="w-full h-full object-cover"
                  />
                  {/* Radar scan effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 pointer-events-none" />
                </div>
              }
              className="h-[350px] md:h-[450px]"
              position={sliderPosition}
            />

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />

            {/* Slider position indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full px-3 py-1">
                <span className="text-xs font-mono text-muted-foreground">
                  {Math.round(100 - sliderPosition)}% Optical · {Math.round(sliderPosition)}% Radar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Physics Demo - Takes 1 column */}
        <div className="lg:col-span-1">
          <SatelliteBeamDemo />
        </div>
      </div>

      {/* Why It Matters Cards */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12 bg-border" />
          <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">Why It Matters</span>
          <div className="h-px w-12 bg-border" />
        </div>
        <WhyItMattersCards radarActive={radarActive} />
      </div>

      {/* Mission Brief */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden">
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">Mission Brief</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">SAR Technology Overview</p>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            Standard cameras are blind during storms. 
            <span className="text-primary font-medium"> Synthetic Aperture Radar (SAR) </span> 
            cuts through clouds to map floods in real-time, guiding rescue teams to stranded villages. 
            This technology enables 24/7 Earth observation regardless of weather conditions or daylight.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary text-glow">24/7</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Monitoring</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-display font-bold text-primary text-glow">100%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Cloud Penetration</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary text-glow">&lt;1hr</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterReliefSlider;
