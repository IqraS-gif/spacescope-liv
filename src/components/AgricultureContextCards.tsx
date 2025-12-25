import { Eye, Activity, Clock } from "lucide-react";

const AgricultureContextCards = () => {
  const cards = [
    {
      id: "trap",
      label: "The Trap",
      title: "Visual Deception",
      icon: Eye,
      text: "To the human eye, these crops look green and healthy because they still contain chlorophyll.",
      color: "amber",
    },
    {
      id: "science",
      label: "The Science",
      title: "Infrared Truth",
      icon: Activity,
      text: "Healthy plants reflect Near-Infrared (NIR) light. Stressed plants stop reflecting NIR days before they physically turn yellow.",
      color: "green",
    },
    {
      id: "impact",
      label: "The Impact",
      title: "2-Week Warning",
      icon: Clock,
      text: "Satellites detect this drop in NIR, giving farmers a 14-day head start to irrigate or treat pests before the crop dies.",
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
            className="relative overflow-hidden rounded-xl p-5 transition-all duration-300 bg-card/60 backdrop-blur-md border border-border hover:border-green-500/40 hover:shadow-[0_0_20px_hsl(142_76%_36%/0.15)] group"
          >
            {/* Card label */}
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              {card.label}
            </div>

            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                card.color === "amber" 
                  ? "bg-amber-500/20 group-hover:shadow-[0_0_15px_hsl(38_92%_50%/0.3)]"
                  : card.color === "green"
                    ? "bg-green-500/20 group-hover:shadow-[0_0_15px_hsl(142_76%_36%/0.3)]"
                    : "bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
              }`}>
                <Icon className={`w-5 h-5 ${
                  card.color === "amber" 
                    ? "text-amber-400" 
                    : card.color === "green" 
                      ? "text-green-400" 
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
              card.color === "amber"
                ? "bg-gradient-to-bl from-amber-500/10 to-transparent"
                : card.color === "green"
                  ? "bg-gradient-to-bl from-green-500/10 to-transparent"
                  : "bg-gradient-to-bl from-primary/10 to-transparent"
            }`} />
          </div>
        );
      })}
    </div>
  );
};

export default AgricultureContextCards;
