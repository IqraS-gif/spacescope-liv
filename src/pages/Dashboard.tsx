import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer } from '@/features/globe';
import { LayerControl } from '@/features/globe/LayerControl';
import { HUDOverlay } from '@/components/layout/HUDOverlay';
import { EventList } from '@/features/events';
import { TimelineView } from '@/features/missions';
import { ISSTracker } from '@/features/satellites';
import { EarthEventsList } from '@/features/earth';
import { SolarGauge, VisibilityChecker } from '@/features/weather';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Satellite, Calendar, Rocket, Flame, Activity, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { activePanel, setActivePanel, sidebarOpen, setSidebarOpen } = useSpaceStore();

  const panels = [
    { id: 'events', label: 'Celestial', icon: Calendar },
    { id: 'missions', label: 'Launches', icon: Rocket },
    { id: 'satellites', label: 'ISS', icon: Satellite },
    { id: 'weather', label: 'Weather', icon: Activity },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Satellite className="w-6 h-6 text-cyan" />
              <span className="font-orbitron font-bold text-lg tracking-wider">SPACESCOPE</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium bg-cyan/20 text-cyan">
              🛰️ Mission Control
            </Link>
            <Link to="/" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
              🌊 Disaster Relief
            </Link>
            <Link to="/agriculture" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
              🌾 Crop Health
            </Link>
            <Link to="/climate" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
              🌍 Climate Archive
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 h-screen flex">
        {/* Globe / Map Area */}
        <div className="flex-1 relative">
          <MapContainer />
          <HUDOverlay />
          
          {/* Layer Control */}
          <div className="absolute top-20 left-4 z-10">
            <LayerControl />
          </div>
        </div>

        {/* Right Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 360 : 48 }}
          className="relative bg-card/95 backdrop-blur-lg border-l border-border overflow-hidden"
        >
          {/* Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 left-2 z-10 p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {sidebarOpen && (
            <div className="h-full pt-14 flex flex-col">
              {/* Panel Tabs */}
              <div className="flex border-b border-border">
                {panels.map((panel) => (
                  <button
                    key={panel.id}
                    onClick={() => setActivePanel(panel.id)}
                    className={cn(
                      'flex-1 py-3 text-xs font-medium transition-colors flex flex-col items-center gap-1',
                      activePanel === panel.id
                        ? 'text-cyan border-b-2 border-cyan bg-cyan/5'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <panel.icon className="w-4 h-4" />
                    {panel.label}
                  </button>
                ))}
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activePanel === 'events' && <EventList />}
                {activePanel === 'missions' && <TimelineView />}
                {activePanel === 'satellites' && <ISSTracker />}
                {activePanel === 'weather' && (
                  <div className="space-y-4">
                    <SolarGauge />
                    <VisibilityChecker />
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.aside>
      </main>
    </div>
  );
};

export default Dashboard;
