import { EyeOff, Radio, HeartPulse } from "lucide-react";

interface WhyItMattersCardsProps {
  radarActive: boolean;
}

const WhyItMattersCards = ({ radarActive }: WhyItMattersCardsProps) => {
  const cards = [
    {
      id: "problem",
      title: "Optical Blindness",
      icon: EyeOff,
      text: "Cameras work like human eyes—they cannot see through the 20km thick cyclone clouds.",
      highlightOnRadar: false,
      color: "amber",
    },
    {
      id: "solution",
      title: "Microwave Vision",
      icon: Radio,
      text: "SAR Satellites shoot microwave pulses that pass through clouds like they aren't even there.",
      highlightOnRadar: true,
      color: "cyan",
    },
    {
      id: "impact",
      title: "Saving Lives",
      icon: HeartPulse,
      text: "This data helps rescue boats find flooded villages in total darkness, cutting response time by 50%.",
      highlightOnRadar: true,
      color: "green",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {cards.map((card, index) => {
        const isHighlighted = card.highlightOnRadar && radarActive;
        const Icon = card.icon;
        
        return (
          <div
            key={card.id}
            className={`
              relative overflow-hidden rounded-xl p-5 transition-all duration-500 ease-out
              bg-card/30 backdrop-blur-md border
              ${isHighlighted 
                ? card.color === "cyan"
                  ? "border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.3)] opacity-100 scale-[1.02]"
                  : "border-green-500/60 shadow-[0_0_30px_hsl(142_76%_36%/0.3)] opacity-100 scale-[1.02]"
                : "border-border/50 opacity-50 hover:opacity-70"
              }
            `}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Glow overlay */}
            {isHighlighted && (
              <div className={`absolute inset-0 pointer-events-none ${
                card.color === "cyan" 
                  ? "bg-gradient-to-br from-primary/10 via-transparent to-primary/5" 
                  : "bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"
              }`} />
            )}

            {/* Card label */}
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              {index === 0 ? "The Problem" : index === 1 ? "The Solution" : "Real Impact"}
            </div>

            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500
                ${isHighlighted 
                  ? card.color === "cyan"
                    ? "bg-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    : "bg-green-500/20 shadow-[0_0_15px_hsl(142_76%_36%/0.4)]"
                  : card.color === "amber"
                    ? "bg-amber-500/10"
                    : "bg-secondary"
                }
              `}>
                <Icon className={`w-5 h-5 transition-colors duration-500 ${
                  isHighlighted 
                    ? card.color === "cyan" ? "text-primary" : "text-green-400"
                    : card.color === "amber" ? "text-amber-400/70" : "text-muted-foreground"
                }`} />
              </div>
              <h4 className={`font-display font-semibold transition-colors duration-500 ${
                isHighlighted ? "text-foreground" : "text-foreground/70"
              }`}>
                {card.title}
              </h4>
            </div>

            {/* Text */}
            <p className={`text-sm leading-relaxed transition-colors duration-500 relative z-10 ${
              isHighlighted ? "text-muted-foreground" : "text-muted-foreground/60"
            }`}>
              {card.text}
            </p>

            {/* Corner accent */}
            {isHighlighted && (
              <div className={`absolute top-0 right-0 w-16 h-16 ${
                card.color === "cyan"
                  ? "bg-gradient-to-bl from-primary/20 to-transparent"
                  : "bg-gradient-to-bl from-green-500/20 to-transparent"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WhyItMattersCards;
