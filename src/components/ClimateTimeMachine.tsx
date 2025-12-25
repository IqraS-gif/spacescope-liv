import { useState, useMemo } from "react";
import { Clock, Calendar, TrendingDown } from "lucide-react";
import aralSea1984 from "@/assets/aral-sea-1984.jpg";
import aralSea1994 from "@/assets/aral-sea-1994.jpg";
import aralSea2004 from "@/assets/aral-sea-2004.jpg";
import aralSea2014 from "@/assets/aral-sea-2014.jpg";
import aralSea2024 from "@/assets/aral-sea-2024.jpg";
import DatacubeDemo from "./DatacubeDemo";
import ClimateContextCards from "./ClimateContextCards";

const timelineData = [
  { year: 1984, image: aralSea1984, waterLevel: 100, label: "Peak Extent" },
  { year: 1994, image: aralSea1994, waterLevel: 75, label: "Early Decline" },
  { year: 2004, image: aralSea2004, waterLevel: 50, label: "Split in Two" },
  { year: 2014, image: aralSea2014, waterLevel: 25, label: "Near Collapse" },
  { year: 2024, image: aralSea2024, waterLevel: 10, label: "Almost Gone" },
];

const ClimateTimeMachine = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const currentIndex = useMemo(() => {
    return Math.min(Math.floor(sliderValue / 25), 4);
  }, [sliderValue]);

  const currentData = timelineData[currentIndex];

  // Calculate color based on timeline position (blue to orange)
  const getTimelineColor = (value: number) => {
    if (value < 25) return "text-blue-400";
    if (value < 50) return "text-cyan-400";
    if (value < 75) return "text-amber-400";
    return "text-orange-500";
  };

  const getBorderColor = (value: number) => {
    if (value < 25) return "border-blue-500/50 shadow-[0_0_30px_hsl(217_91%_60%/0.2)]";
    if (value < 50) return "border-cyan-500/50 shadow-[0_0_30px_hsl(188_100%_50%/0.2)]";
    if (value < 75) return "border-amber-500/50 shadow-[0_0_30px_hsl(38_92%_50%/0.2)]";
    return "border-orange-500/50 shadow-[0_0_30px_hsl(25_95%_53%/0.2)]";
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
          <Clock className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-display uppercase tracking-widest text-orange-400">Climate Archive</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-glow mb-2">
          The Time Machine
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Drag the timeline to witness 40 years of environmental change
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Scrubber Container - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-500 ${getBorderColor(sliderValue)}`}>
            {/* Archive date overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-6 py-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-1">Archive Date</p>
                <p className={`text-3xl md:text-4xl font-mono font-bold transition-colors duration-300 ${getTimelineColor(sliderValue)}`}>
                  {currentData.year}
                </p>
              </div>
            </div>

            {/* Image viewport */}
            <div className="relative h-[280px] md:h-[350px] overflow-hidden bg-background">
              {timelineData.map((data, index) => (
                <img
                  key={data.year}
                  src={data.image}
                  alt={`Aral Sea in ${data.year}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    zIndex: index === currentIndex ? 1 : 0,
                  }}
                />
              ))}

              {/* Scan lines overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-10">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px bg-foreground"
                    style={{ top: `${i * 5}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Water level indicator */}
            <div className="absolute top-20 right-4 z-10">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-3 py-2 w-24">
                <p className="text-[10px] font-mono text-muted-foreground mb-1">WATER LEVEL</p>
                <div className="h-32 w-4 mx-auto bg-muted rounded-full overflow-hidden relative">
                  <div 
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-500 rounded-full ${
                      currentData.waterLevel > 50 ? 'bg-blue-500' : currentData.waterLevel > 25 ? 'bg-amber-500' : 'bg-orange-500'
                    }`}
                    style={{ height: `${currentData.waterLevel}%` }}
                  />
                </div>
                <p className={`text-xs font-mono mt-1 text-center ${getTimelineColor(sliderValue)}`}>
                  {currentData.waterLevel}%
                </p>
              </div>
            </div>

            {/* Status label */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-3 py-2">
                <p className="text-[10px] font-mono text-muted-foreground">STATUS</p>
                <p className={`text-sm font-display font-semibold ${getTimelineColor(sliderValue)}`}>
                  {currentData.label}
                </p>
              </div>
            </div>

            {/* Location badge */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-3 py-2">
                <p className="text-xs font-mono text-muted-foreground">Aral Sea</p>
                <p className="text-[10px] text-muted-foreground/70">Central Asia</p>
              </div>
            </div>
          </div>

          {/* Timeline slider - OUTSIDE the image container */}
          <div className="bg-card border-t border-border px-6 py-5">
            {/* Timeline ticks */}
            <div className="relative h-8 mb-3">
              {timelineData.map((data, index) => (
                <div
                  key={data.year}
                  className="absolute top-0 flex flex-col items-center"
                  style={{ left: `${index * 25}%`, transform: 'translateX(-50%)' }}
                >
                  <div className={`w-px h-4 transition-colors duration-300 ${
                    index <= currentIndex ? getTimelineColor(sliderValue).replace('text-', 'bg-') : 'bg-muted-foreground/30'
                  }`} />
                  <span className={`text-sm font-mono mt-1 transition-colors duration-300 ${
                    index === currentIndex ? getTimelineColor(sliderValue) + ' font-bold' : 'text-muted-foreground/50'
                  }`}>
                    {data.year}
                  </span>
                </div>
              ))}
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-3 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_20px_hsl(var(--primary)/0.6)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground/20"
            />

            {/* Progress bar */}
            <div className="relative h-2 mt-3 bg-muted/50 rounded-full overflow-hidden">
              <div 
                className={`absolute left-0 top-0 bottom-0 rounded-full transition-all duration-300 ${
                  sliderValue < 25 ? 'bg-blue-500' : sliderValue < 50 ? 'bg-cyan-500' : sliderValue < 75 ? 'bg-amber-500' : 'bg-orange-500'
                }`}
                style={{ width: `${sliderValue}%` }}
              />
            </div>

            {/* Drag instruction */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              ← Drag the slider to travel through time →
            </p>
          </div>
        </div>

        {/* Datacube Demo - Takes 1 column */}
        <div className="lg:col-span-1">
          <DatacubeDemo />
        </div>
      </div>

      {/* Context Cards */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12 bg-border" />
          <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">Why It Matters</span>
          <div className="h-px w-12 bg-border" />
        </div>
        <ClimateContextCards />
      </div>

      {/* Stats Section */}
      <div className="mt-8 bg-card border border-border rounded-xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/5 to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">The Aral Sea Disaster</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Case Study in Environmental Change</p>
            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            Once the fourth-largest lake in the world, the Aral Sea has shrunk by 
            <span className="text-orange-400 font-medium"> over 90% </span> 
            since the 1960s due to Soviet-era irrigation projects. Satellite imagery provides 
            undeniable evidence of this transformation, influencing water policy worldwide.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-blue-400" style={{ textShadow: '0 0 20px hsl(217 91% 60% / 0.6)' }}>52</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Years of Data</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl font-display font-bold text-orange-400" style={{ textShadow: '0 0 20px hsl(25 95% 53% / 0.6)' }}>90%</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Water Lost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary text-glow">16</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Day Revisit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateTimeMachine;
