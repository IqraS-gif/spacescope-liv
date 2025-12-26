import { Sun, Zap, Wind, AlertTriangle, Activity, Shield, Thermometer, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import AppNavLink from "@/components/AppNavLink";

const solarData = {
  solarWindSpeed: 425,
  solarWindDensity: 4.2,
  magneticField: -3.5,
  kpIndex: 4,
  xrayFlux: "C2.3",
  protonFlux: "Normal",
};

const alerts = [
  {
    level: "warning",
    title: "G1 Geomagnetic Storm Watch",
    time: "Next 24 hours",
    description: "Minor storm expected. Aurora visible at high latitudes.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
  },
  {
    level: "info",
    title: "Elevated Solar Activity",
    time: "Ongoing",
    description: "Active sunspot region 3842 producing C-class flares.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
];

const auroraForecast = [
  { region: "Fairbanks, Alaska", probability: 85, optimal: "02:00 - 05:00" },
  { region: "Reykjavik, Iceland", probability: 72, optimal: "23:00 - 03:00" },
  { region: "Tromsø, Norway", probability: 68, optimal: "22:00 - 02:00" },
  { region: "Yellowknife, Canada", probability: 78, optimal: "01:00 - 04:00" },
];

const CosmicWeather = () => {
  const getKpColor = (kp: number) => {
    if (kp <= 2) return "text-green-400";
    if (kp <= 4) return "text-amber-400";
    if (kp <= 6) return "text-orange-400";
    return "text-red-400";
  };

  const getKpLevel = (kp: number) => {
    if (kp <= 2) return "Quiet";
    if (kp <= 4) return "Unsettled";
    if (kp <= 6) return "Storm";
    return "Severe Storm";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center">
              <Sun className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Cosmic Weather</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Space Environment</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <NavLink to="/" icon="satellite" label="Disaster Relief" />
            <NavLink to="/agriculture" icon="leaf" label="Crop Health" color="text-green-400" />
            <NavLink to="/climate" icon="clock" label="Climate" color="text-orange-400" />
            <NavLink to="/celestial" icon="calendar" label="Events" color="text-amber-400" />
            <NavLink to="/cosmic-weather" icon="sun" label="Weather" color="text-purple-400" active />
            <NavLink to="/missions" icon="rocket" label="Missions" color="text-blue-400" />
            <NavLink to="/learn" icon="book" label="Learn" color="text-emerald-400" />
            <NavLink to="/impact" icon="globe" label="Impact" color="text-rose-400" />
          </nav>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">REAL-TIME</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Alerts Banner */}
          {alerts.length > 0 && (
            <div className="mb-8 space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${alert.bgColor} ${alert.borderColor} flex items-start gap-4`}
                >
                  <AlertTriangle className={`w-5 h-5 ${alert.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-medium ${alert.color}`}>{alert.title}</h3>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Solar Wind & Magnetic Field */}
            <div className="lg:col-span-2 space-y-6">
              {/* KP Index Hero */}
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground">Geomagnetic Activity</h3>
                    <p className="text-sm text-muted-foreground">Current Kp Index</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Updated every 3 hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  {/* KP Gauge */}
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={`${(solarData.kpIndex / 9) * 251} 251`}
                        className={getKpColor(solarData.kpIndex)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-display font-bold ${getKpColor(solarData.kpIndex)}`}>
                        {solarData.kpIndex}
                      </span>
                      <span className="text-xs text-muted-foreground">Kp</span>
                    </div>
                  </div>

                  {/* KP Scale */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-lg font-medium ${getKpColor(solarData.kpIndex)}`}>
                        {getKpLevel(solarData.kpIndex)}
                      </span>
                    </div>
                    <div className="flex gap-1 h-4">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${
                            i < solarData.kpIndex
                              ? i <= 2
                                ? "bg-green-400"
                                : i <= 4
                                ? "bg-amber-400"
                                : i <= 6
                                ? "bg-orange-400"
                                : "bg-red-400"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>Quiet</span>
                      <span>Minor Storm</span>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Wind Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Wind className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Solar Wind Speed</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-foreground">
                    {solarData.solarWindSpeed}
                    <span className="text-sm font-normal text-muted-foreground ml-1">km/s</span>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-muted-foreground">X-Ray Flux</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-foreground">
                    {solarData.xrayFlux}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-muted-foreground">Proton Flux</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-green-400">
                    {solarData.protonFlux}
                  </div>
                </div>
              </div>

              {/* Radiation Alert */}
              <div className="rounded-xl border border-green-400/30 bg-green-400/5 p-4">
                <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-green-400" />
                  <div>
                    <h4 className="font-medium text-green-400">Radiation Environment: Normal</h4>
                    <p className="text-sm text-muted-foreground">
                      No elevated radiation levels detected. Safe for satellite operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aurora Forecast */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                    <Thermometer className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">Aurora Forecast</h3>
                    <p className="text-xs text-muted-foreground">Tonight's viewing probability</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {auroraForecast.map((location, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{location.region}</span>
                        <span className={`text-lg font-bold ${
                          location.probability >= 75 ? "text-emerald-400" :
                          location.probability >= 50 ? "text-amber-400" : "text-muted-foreground"
                        }`}>
                          {location.probability}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            location.probability >= 75 ? "bg-emerald-400" :
                            location.probability >= 50 ? "bg-amber-400" : "bg-muted-foreground"
                          }`}
                          style={{ width: `${location.probability}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Best viewing: {location.optimal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="rounded-xl border border-purple-400/30 bg-purple-400/5 p-4">
                <h4 className="font-medium text-purple-400 mb-2">What causes auroras?</h4>
                <p className="text-sm text-muted-foreground">
                  Charged particles from solar wind interact with Earth's magnetic field and atmosphere, 
                  creating colorful light displays near the poles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Real-time Cosmic Weather Data
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CosmicWeather;
