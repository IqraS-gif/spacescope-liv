import React from 'react';
import { cn } from '@/lib/utils';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { MapStyle } from '@/services/apiTypes';
import { Globe, Moon, Sun, Mountain, Layers, Satellite, Flame, Cloud } from 'lucide-react';

export const LayerControl: React.FC = () => {
  const { mapStyle, setMapStyle, activeLayers, toggleLayer } = useSpaceStore();

  const styleOptions: Array<{ id: MapStyle; icon: React.ReactNode; label: string }> = [
    { id: 'satellite', icon: <Globe className="w-4 h-4" />, label: 'Satellite' },
    { id: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { id: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { id: 'terrain', icon: <Mountain className="w-4 h-4" />, label: 'Terrain' }
  ];

  const overlayIcons: Record<string, React.ReactNode> = {
    iss: <Satellite className="w-4 h-4" />,
    events: <Flame className="w-4 h-4" />,
    weather: <Cloud className="w-4 h-4" />
  };

  return (
    <div className="bg-card/90 backdrop-blur-lg rounded-lg border border-border/50 p-3 w-48">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
        <Layers className="w-4 h-4 text-cyan" />
        <span className="text-xs font-orbitron text-cyan tracking-wider">LAYERS</span>
      </div>

      {/* Map Style */}
      <div className="mb-4">
        <span className="text-xs text-muted-foreground mb-2 block">Base Map</span>
        <div className="grid grid-cols-2 gap-1">
          {styleOptions.map((style) => (
            <button
              key={style.id}
              onClick={() => setMapStyle(style.id)}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1.5 rounded text-xs transition-colors',
                mapStyle === style.id
                  ? 'bg-cyan/20 text-cyan'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {style.icon}
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlays */}
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Overlays</span>
        <div className="space-y-1">
          {activeLayers.filter(l => l.type === 'overlay').map((layer) => (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors',
                layer.visible
                  ? 'bg-cyan/20 text-cyan'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {overlayIcons[layer.id] || <Layers className="w-4 h-4" />}
              <span>{layer.name}</span>
              <div className={cn(
                'ml-auto w-2 h-2 rounded-full',
                layer.visible ? 'bg-cyan' : 'bg-muted-foreground/50'
              )} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
