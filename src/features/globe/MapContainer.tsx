import React, { useState } from 'react';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Flame, Mountain, Satellite } from 'lucide-react';

export const MapContainer: React.FC = () => {
  const { naturalEvents } = useSpaceStore();
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  if (showTokenInput && !mapboxToken) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background">
        <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-4">
          <h3 className="font-orbitron text-lg font-bold text-cyan mb-3">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your Mapbox public token to enable the interactive globe. 
            Get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">mapbox.com</a>
          </p>
          <input
            type="text"
            placeholder="pk.eyJ1..."
            className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm font-mono mb-3"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowTokenInput(false)}
              className="flex-1 px-4 py-2 bg-cyan/20 text-cyan rounded-lg text-sm font-medium hover:bg-cyan/30 transition-colors"
            >
              Use Token
            </button>
            <button
              onClick={() => setShowTokenInput(false)}
              className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors"
            >
              Skip (Demo Mode)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="relative w-[500px] h-[500px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-emerald-500/20 animate-pulse" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-cyan/30" />
        <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-700/40 to-emerald-700/30 border border-emerald-500/20" />
        
        <div className="absolute top-20 right-24 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-cyan/30 animate-ping" />
            <div className="relative w-8 h-8 rounded-full bg-cyan/80 border-2 border-cyan flex items-center justify-center">
              <Satellite className="w-4 h-4 text-background" />
            </div>
          </div>
          <p className="text-xs text-cyan mt-1 font-mono">ISS</p>
        </div>

        {naturalEvents.slice(0, 4).map((event, i) => (
          <div
            key={event.id}
            className="absolute"
            style={{ top: `${25 + (i % 2) * 40}%`, left: `${15 + i * 18}%` }}
          >
            <div className="p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border">
              {event.category === 'wildfire' ? <Flame className="w-4 h-4 text-orange-500" /> : <Mountain className="w-4 h-4 text-red-500" />}
            </div>
          </div>
        ))}
      </div>
      <p className="absolute bottom-8 text-muted-foreground text-sm">Demo Mode - Add Mapbox token for full globe</p>
    </div>
  );
};
