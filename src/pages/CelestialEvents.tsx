import { Calendar, MapPin, Clock, Moon, Sun, Star, Eye, Telescope } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppNavLink from "@/components/AppNavLink";

const upcomingEvents = [
  {
    id: 1,
    name: "Total Lunar Eclipse",
    date: "March 14, 2025",
    time: "02:30 UTC",
    type: "eclipse",
    visibility: ["North America", "Europe", "Africa"],
    description: "A spectacular total lunar eclipse visible across multiple continents.",
    icon: Moon,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    id: 2,
    name: "Lyrid Meteor Shower",
    date: "April 22, 2025",
    time: "Peak at midnight",
    type: "meteor",
    visibility: ["Northern Hemisphere"],
    description: "Up to 20 meteors per hour radiating from constellation Lyra.",
    icon: Star,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    id: 3,
    name: "Partial Solar Eclipse",
    date: "March 29, 2025",
    time: "10:15 UTC",
    type: "eclipse",
    visibility: ["Europe", "North Africa", "Western Asia"],
    description: "The Moon will cover approximately 40% of the Sun's disk.",
    icon: Sun,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
  },
  {
    id: 4,
    name: "Jupiter Opposition",
    date: "December 7, 2025",
    time: "All night",
    type: "planet",
    visibility: ["Worldwide"],
    description: "Jupiter at its closest and brightest - perfect for observation.",
    icon: Telescope,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
  },
];

const visibilityRegions = [
  { name: "North America", coords: { x: 20, y: 35 }, active: true },
  { name: "Europe", coords: { x: 48, y: 30 }, active: true },
  { name: "Asia", coords: { x: 70, y: 35 }, active: false },
  { name: "Africa", coords: { x: 50, y: 55 }, active: true },
  { name: "South America", coords: { x: 30, y: 65 }, active: false },
  { name: "Australia", coords: { x: 80, y: 70 }, active: false },
];

const CelestialEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(upcomingEvents[0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Celestial Events</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Sky Calendar</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <AppNavLink to="/" icon="satellite" label="Disaster Relief" />
            <AppNavLink to="/agriculture" icon="leaf" label="Crop Health" color="text-green-400" />
            <AppNavLink to="/climate" icon="clock" label="Climate" color="text-orange-400" />
            <AppNavLink to="/celestial" icon="calendar" label="Events" color="text-amber-400" active />
            <AppNavLink to="/cosmic-weather" icon="sun" label="Weather" color="text-purple-400" />
            <AppNavLink to="/missions" icon="rocket" label="Missions" color="text-blue-400" />
            <AppNavLink to="/learn" icon="book" label="Learn" color="text-emerald-400" />
            <AppNavLink to="/impact" icon="globe" label="Impact" color="text-rose-400" />
          </nav>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">LIVE SKY DATA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400 font-medium">Upcoming Celestial Events</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Don't Miss the Sky Show
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track eclipses, meteor showers, planetary alignments, and more with precise timing and visibility maps.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Events List */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Upcoming Events
              </h3>
              {upcomingEvents.map((event) => {
                const Icon = event.icon;
                const isSelected = selectedEvent.id === event.id;
                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? `${event.bgColor} ${event.borderColor} border-2`
                        : "bg-card/50 border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${event.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${event.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium ${isSelected ? event.color : "text-foreground"}`}>
                          {event.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visibility Map */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
                {/* Event Header */}
                <div className={`p-6 ${selectedEvent.bgColor} border-b ${selectedEvent.borderColor}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl ${selectedEvent.bgColor} border ${selectedEvent.borderColor} flex items-center justify-center`}>
                      <selectedEvent.icon className={`w-7 h-7 ${selectedEvent.color}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-display font-bold ${selectedEvent.color}`}>
                        {selectedEvent.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {selectedEvent.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedEvent.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-foreground/80">{selectedEvent.description}</p>
                </div>

                {/* World Map */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Visibility Map</span>
                  </div>
                  
                  <div className="relative aspect-[2/1] bg-muted/30 rounded-lg overflow-hidden border border-border">
                    {/* Simplified World Map SVG */}
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      {/* Grid lines */}
                      {[...Array(10)].map((_, i) => (
                        <line
                          key={`v-${i}`}
                          x1={i * 10}
                          y1="0"
                          x2={i * 10}
                          y2="50"
                          stroke="hsl(var(--border))"
                          strokeWidth="0.2"
                        />
                      ))}
                      {[...Array(5)].map((_, i) => (
                        <line
                          key={`h-${i}`}
                          x1="0"
                          y1={i * 10}
                          x2="100"
                          y2={i * 10}
                          stroke="hsl(var(--border))"
                          strokeWidth="0.2"
                        />
                      ))}
                      
                      {/* Continent outlines (simplified) */}
                      <path
                        d="M15,25 Q20,20 25,22 Q30,28 25,35 Q18,38 15,30 Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M25,45 Q28,42 32,45 Q35,55 30,60 Q25,58 25,50 Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M42,20 Q50,15 58,20 Q55,35 50,40 Q42,38 40,28 Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M45,38 Q52,35 55,45 Q50,55 45,50 Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M60,15 Q75,12 85,20 Q88,35 80,40 Q65,38 60,25 Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M75,42 Q82,40 85,48 Q80,52 75,48 Z"
                        fill="hsl(var(--muted))"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                      />

                      {/* Visibility markers */}
                      {visibilityRegions.map((region, index) => {
                        const isVisible = selectedEvent.visibility.some(v => 
                          region.name.includes(v) || v.includes(region.name) || v === "Worldwide"
                        );
                        return (
                          <g key={region.name}>
                            <circle
                              cx={region.coords.x}
                              cy={region.coords.y}
                              r={isVisible ? "4" : "2"}
                              fill={isVisible ? selectedEvent.color.replace("text-", "").includes("primary") ? "hsl(var(--primary))" : `hsl(var(--${selectedEvent.color.replace("text-", "").replace("-400", "")}))` : "hsl(var(--muted-foreground))"}
                              opacity={isVisible ? 1 : 0.3}
                              className={isVisible ? "animate-pulse" : ""}
                            />
                            {isVisible && (
                              <circle
                                cx={region.coords.x}
                                cy={region.coords.y}
                                r="8"
                                fill="none"
                                stroke={selectedEvent.color.replace("text-", "").includes("primary") ? "hsl(var(--primary))" : "currentColor"}
                                strokeWidth="0.5"
                                opacity="0.5"
                                className="animate-ping"
                                style={{ animationDuration: `${2 + index * 0.3}s` }}
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    {/* Legend */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${selectedEvent.color.replace("text-", "bg-")}`} />
                        <span className="text-muted-foreground">Visible</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                        <span className="text-muted-foreground">Not visible</span>
                      </div>
                    </div>
                  </div>

                  {/* Visibility List */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedEvent.visibility.map((region) => (
                      <span
                        key={region}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${selectedEvent.bgColor} ${selectedEvent.color} border ${selectedEvent.borderColor}`}
                      >
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Celestial Events Calendar
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CelestialEvents;
