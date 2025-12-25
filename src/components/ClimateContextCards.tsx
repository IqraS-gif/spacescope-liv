import { Thermometer, Database, Scale } from "lucide-react";

const ClimateContextCards = () => {
  const cards = [
    {
      id: "problem",
      label: "The Problem",
      title: "The Boiling Frog",
      icon: Thermometer,
      text: "Human memory is short. We often fail to notice massive environmental changes because they happen slowly over decades.",
      color: "orange",
    },
    {
      id: "solution",
      label: "The Solution",
      title: "The Landsat Archive",
      icon: Database,
      text: "Since 1972, the Landsat program has taken a photo of the entire Earth every 16 days, creating an unbiased history of our planet.",
      color: "blue",
    },
    {
      id: "impact",
      label: "The Impact",
      title: "Policy Proof",
      icon: Scale,
      text: "This irrefutable visual evidence forces governments to admit environmental damage and creates laws to protect forests and water.",
      color: "cyan",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {cards.map((card) => {
        const Icon = card.icon;
        
        return (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-xl p-5 transition-all duration-300 bg-card/60 backdrop-blur-md border border-border hover:border-orange-500/40 hover:shadow-[0_0_20px_hsl(25_95%_53%/0.15)] group"
          >
            {/* Card label */}
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              {card.label}
            </div>

            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                card.color === "orange" 
                  ? "bg-orange-500/20 group-hover:shadow-[0_0_15px_hsl(25_95%_53%/0.3)]"
                  : card.color === "blue"
                    ? "bg-blue-500/20 group-hover:shadow-[0_0_15px_hsl(217_91%_60%/0.3)]"
                    : "bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
              }`}>
                <Icon className={`w-5 h-5 ${
                  card.color === "orange" 
                    ? "text-orange-400" 
                    : card.color === "blue" 
                      ? "text-blue-400" 
                      : "text-primary"
                }`} />
              </div>
              <h4 className="font-display font-semibold text-foreground">
                {card.title}
              </h4>
            </div>

            {/* Text */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {card.text}
            </p>

            {/* Corner accent on hover */}
            <div className={`absolute top-0 right-0 w-16 h-16 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
              card.color === "orange"
                ? "bg-gradient-to-bl from-orange-500/10 to-transparent"
                : card.color === "blue"
                  ? "bg-gradient-to-bl from-blue-500/10 to-transparent"
                  : "bg-gradient-to-bl from-primary/10 to-transparent"
            }`} />
          </div>
        );
      })}
    </div>
  );
};

export default ClimateContextCards;
