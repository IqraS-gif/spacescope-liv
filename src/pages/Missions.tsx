import { Rocket, Calendar, MapPin, CheckCircle, Clock, ArrowRight, Satellite, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppNavLink from "@/components/AppNavLink";

const missions = [
  {
    id: 1,
    name: "Artemis III",
    agency: "NASA",
    type: "Crewed Lunar Landing",
    status: "upcoming",
    date: "2026",
    description: "First crewed lunar landing since Apollo 17, including the first woman on the Moon.",
    icon: Moon,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    milestones: [
      { label: "Mission approved", done: true },
      { label: "Starship HLS selected", done: true },
      { label: "Gateway modules launched", done: false },
      { label: "Crew training complete", done: false },
    ],
  },
  {
    id: 2,
    name: "Europa Clipper",
    agency: "NASA/JPL",
    type: "Jupiter Moon Orbiter",
    status: "active",
    date: "Launched Oct 2024",
    description: "Investigating Europa's ice shell and ocean to assess habitability potential.",
    icon: Satellite,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    milestones: [
      { label: "Launch", done: true },
      { label: "Mars gravity assist", done: false },
      { label: "Jupiter orbit insertion", done: false },
      { label: "First Europa flyby", done: false },
    ],
  },
  {
    id: 3,
    name: "Mars Sample Return",
    agency: "NASA/ESA",
    type: "Sample Collection",
    status: "planning",
    date: "2030s",
    description: "Returning samples collected by Perseverance rover to Earth for analysis.",
    icon: Rocket,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    milestones: [
      { label: "Sample caching (Perseverance)", done: true },
      { label: "Sample Retrieval Lander", done: false },
      { label: "Mars Ascent Vehicle", done: false },
      { label: "Earth Entry System", done: false },
    ],
  },
  {
    id: 4,
    name: "JUICE",
    agency: "ESA",
    type: "Jupiter Icy Moons Explorer",
    status: "active",
    date: "Launched Apr 2023",
    description: "Studying Jupiter's icy moons Ganymede, Callisto, and Europa.",
    icon: Satellite,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    milestones: [
      { label: "Launch", done: true },
      { label: "Earth-Moon gravity assist", done: true },
      { label: "Venus flyby", done: false },
      { label: "Jupiter arrival (2031)", done: false },
    ],
  },
  {
    id: 5,
    name: "Starship Mars",
    agency: "SpaceX",
    type: "Mars Transport",
    status: "development",
    date: "2028+",
    description: "Fully reusable spacecraft designed for Mars colonization missions.",
    icon: Rocket,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/30",
    milestones: [
      { label: "Orbital test flight", done: true },
      { label: "Propellant transfer demo", done: false },
      { label: "Lunar landing (Artemis)", done: false },
      { label: "First Mars mission", done: false },
    ],
  },
];

const statusColors: Record<string, { text: string; bg: string; border: string }> = {
  active: { text: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  upcoming: { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  planning: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  development: { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  completed: { text: "text-muted-foreground", bg: "bg-muted/30", border: "border-muted" },
};

const Missions = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredMissions = filter === "all" 
    ? missions 
    : missions.filter(m => m.status === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Space Missions</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Mission Timeline</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <AppNavLink to="/" icon="satellite" label="Disaster Relief" />
            <AppNavLink to="/agriculture" icon="leaf" label="Crop Health" color="text-green-400" />
            <AppNavLink to="/climate" icon="clock" label="Climate" color="text-orange-400" />
            <AppNavLink to="/celestial" icon="calendar" label="Events" color="text-amber-400" />
            <AppNavLink to="/cosmic-weather" icon="sun" label="Weather" color="text-purple-400" />
            <AppNavLink to="/missions" icon="rocket" label="Missions" color="text-blue-400" active />
            <AppNavLink to="/learn" icon="book" label="Learn" color="text-emerald-400" />
            <AppNavLink to="/impact" icon="globe" label="Impact" color="text-rose-400" />
          </nav>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">TRACKING</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Humanity's Journey to the Stars
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track active, upcoming, and planned space missions from agencies around the world.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["all", "active", "upcoming", "development", "planning"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {/* Missions */}
            <div className="space-y-8">
              {filteredMissions.map((mission, index) => {
                const Icon = mission.icon;
                const statusStyle = statusColors[mission.status];
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={mission.id}
                    className={`relative flex items-start gap-4 md:gap-8 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-card border-2 border-primary -translate-x-1/2 z-10" />

                    {/* Spacer for desktop */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Content Card */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                      <div className={`rounded-xl border ${mission.borderColor} ${mission.bgColor} p-6 transition-all hover:scale-[1.02]`}>
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl ${mission.bgColor} border ${mission.borderColor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-6 h-6 ${mission.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`text-xl font-display font-bold ${mission.color}`}>
                                {mission.name}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                                {mission.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span>{mission.agency}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {mission.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-foreground/80 text-sm mb-4">{mission.description}</p>

                        {/* Type Badge */}
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground mb-4">
                          <Rocket className="w-3 h-3" />
                          {mission.type}
                        </div>

                        {/* Milestones */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Mission Milestones
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {mission.milestones.map((milestone, i) => (
                              <div
                                key={i}
                                className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                                  milestone.done
                                    ? "bg-green-400/10 text-green-400"
                                    : "bg-muted/30 text-muted-foreground"
                                }`}
                              >
                                {milestone.done ? (
                                  <CheckCircle className="w-3 h-3 flex-shrink-0" />
                                ) : (
                                  <Clock className="w-3 h-3 flex-shrink-0" />
                                )}
                                <span className="truncate">{milestone.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Space Mission Timeline
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Missions;
