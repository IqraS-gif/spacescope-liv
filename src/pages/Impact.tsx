import { Globe, Droplets, Flame, Wheat, TreePine, Activity, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppNavLink from "@/components/AppNavLink";

const impactAreas = [
  {
    id: "disaster",
    title: "Disaster Response",
    icon: Flame,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/30",
    stat: "72 hours",
    statLabel: "faster relief coordination",
    description: "Satellites provide real-time damage assessment after earthquakes, floods, and wildfires, helping responders prioritize affected areas.",
    examples: [
      "Hurricane damage mapping within 6 hours",
      "Flood extent monitoring for evacuation routes",
      "Wildfire progression tracking for firefighters",
    ],
  },
  {
    id: "agriculture",
    title: "Food Security",
    icon: Wheat,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
    stat: "14 days",
    statLabel: "early crop stress detection",
    description: "Multispectral imaging detects plant stress before visible symptoms appear, allowing farmers to intervene and prevent crop loss.",
    examples: [
      "Drought stress detection in corn fields",
      "Pest infestation early warning systems",
      "Precision irrigation recommendations",
    ],
  },
  {
    id: "water",
    title: "Water Resources",
    icon: Droplets,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    stat: "40%",
    statLabel: "better water management",
    description: "Satellite data tracks reservoir levels, groundwater depletion, and water quality, enabling sustainable resource management.",
    examples: [
      "Reservoir level monitoring in drought regions",
      "Groundwater depletion mapping",
      "Algae bloom detection in lakes",
    ],
  },
  {
    id: "forest",
    title: "Forest Conservation",
    icon: TreePine,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/30",
    stat: "Real-time",
    statLabel: "deforestation alerts",
    description: "Daily monitoring detects illegal logging and deforestation within hours, enabling rapid enforcement and conservation action.",
    examples: [
      "Amazon deforestation alerts to authorities",
      "Carbon stock estimation for climate credits",
      "Reforestation progress tracking",
    ],
  },
];

const globalStats = [
  { value: "190+", label: "Countries using satellite data", trend: "+12% yearly" },
  { value: "$300B", label: "Annual economic benefit", trend: "+8% yearly" },
  { value: "1.5M", label: "Daily images captured", trend: "+25% yearly" },
  { value: "15,000+", label: "Research papers using EO data", trend: "+18% yearly" },
];

const Impact = () => {
  const [activeArea, setActiveArea] = useState(impactAreas[0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-400/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Real-World Impact</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Satellite Solutions</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <NavLink to="/" icon="satellite" label="Disaster Relief" />
            <NavLink to="/agriculture" icon="leaf" label="Crop Health" color="text-green-400" />
            <NavLink to="/climate" icon="clock" label="Climate" color="text-orange-400" />
            <NavLink to="/celestial" icon="calendar" label="Events" color="text-amber-400" />
            <NavLink to="/cosmic-weather" icon="sun" label="Weather" color="text-purple-400" />
            <NavLink to="/missions" icon="rocket" label="Missions" color="text-blue-400" />
            <NavLink to="/learn" icon="book" label="Learn" color="text-emerald-400" />
            <NavLink to="/impact" icon="globe" label="Impact" color="text-rose-400" active />
          </nav>

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-mono text-muted-foreground">GLOBAL DATA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Satellites Solving Real Problems
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how Earth observation data translates into tangible benefits for communities, farmers, and the environment.
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {globalStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border bg-card/50 text-center"
              >
                <div className="text-3xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                <div className="inline-flex items-center gap-1 text-xs text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Impact Areas */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Selector */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Impact Areas
              </h3>
              {impactAreas.map((area) => {
                const Icon = area.icon;
                const isActive = activeArea.id === area.id;
                return (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? `${area.bgColor} ${area.borderColor} border-2`
                        : "bg-card/50 border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${area.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${area.color}`} />
                      </div>
                      <div>
                        <h4 className={`font-medium ${isActive ? area.color : "text-foreground"}`}>
                          {area.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{area.statLabel}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-2">
              <div className={`rounded-xl border ${activeArea.borderColor} ${activeArea.bgColor} overflow-hidden`}>
                {/* Header */}
                <div className="p-6 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl ${activeArea.bgColor} border ${activeArea.borderColor} flex items-center justify-center`}>
                      <activeArea.icon className={`w-7 h-7 ${activeArea.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-display font-bold ${activeArea.color}`}>
                        {activeArea.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-3xl font-bold ${activeArea.color}`}>
                          {activeArea.stat}
                        </span>
                        <span className="text-sm text-muted-foreground">{activeArea.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-foreground/80 text-lg mb-6">
                    {activeArea.description}
                  </p>

                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Real-World Applications
                  </h4>
                  <div className="space-y-3">
                    {activeArea.examples.map((example, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border"
                      >
                        <ArrowRight className={`w-4 h-4 ${activeArea.color} flex-shrink-0`} />
                        <span className="text-foreground">{example}</span>
                      </div>
                    ))}
                  </div>

                  {/* Visual Demo Placeholder */}
                  <div className="mt-6 aspect-video rounded-lg bg-muted/30 border border-border flex items-center justify-center">
                    <div className="text-center">
                      <activeArea.icon className={`w-12 h-12 ${activeArea.color} mx-auto mb-2 opacity-50`} />
                      <p className="text-sm text-muted-foreground">
                        Interactive visualization coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-xl border border-border bg-card/50">
              <div className="text-left">
                <h4 className="font-display font-bold text-foreground">
                  See it in action
                </h4>
                <p className="text-sm text-muted-foreground">
                  Explore our interactive demos showcasing real satellite applications
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Disaster Relief
                </Link>
                <Link
                  to="/agriculture"
                  className="px-4 py-2 rounded-lg bg-green-400 text-primary-foreground text-sm font-medium hover:bg-green-500 transition-colors"
                >
                  Crop Health
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Real-World Satellite Impact
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Impact;
