import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { MapPin, Cloud, Eye, Moon, Lightbulb, Star, Search } from 'lucide-react';

export const VisibilityChecker: React.FC = () => {
  const { visibility, userPreferences, setUserLocation } = useSpaceStore();
  const [locationInput, setLocationInput] = useState('');

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'excellent': return 'text-emerald-400 bg-emerald-400/20';
      case 'good': return 'text-cyan bg-cyan/20';
      case 'fair': return 'text-yellow-400 bg-yellow-400/20';
      case 'poor': return 'text-red-400 bg-red-400/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleLocationSearch = () => {
    // Mock location search
    setUserLocation({
      latitude: 37.7749,
      longitude: -122.4194,
      city: locationInput || 'San Francisco',
      country: 'USA'
    });
  };

  return (
    <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-cyan" />
        <span className="font-orbitron text-sm font-semibold">Tonight's Forecast</span>
      </div>

      {/* Location Input */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Enter city..."
            className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-sm"
          />
        </div>
        <button
          onClick={handleLocationSearch}
          className="px-3 py-2 bg-cyan/20 text-cyan rounded-lg hover:bg-cyan/30 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground">{visibility.location}</p>
          <p className="text-xs text-muted-foreground">Stargazing conditions</p>
        </div>
        <div className={cn('px-4 py-2 rounded-lg font-semibold', getScoreColor(visibility.score))}>
          {visibility.score.toUpperCase()}
        </div>
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Cloud className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Cloud Cover</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-mono font-semibold">{visibility.cloudCover}</span>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                'h-full rounded-full',
                visibility.cloudCover < 20 ? 'bg-emerald-400' :
                visibility.cloudCover < 50 ? 'bg-yellow-400' : 'bg-red-400'
              )}
              style={{ width: `${visibility.cloudCover}%` }}
            />
          </div>
        </div>

        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Moon className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Moon Phase</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-mono font-semibold">{Math.round(visibility.moonPhase * 100)}</span>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {visibility.moonPhase < 0.25 ? 'New Moon' :
             visibility.moonPhase < 0.5 ? 'First Quarter' :
             visibility.moonPhase < 0.75 ? 'Full Moon' : 'Last Quarter'}
          </p>
        </div>

        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Light Pollution</span>
          </div>
          <span className={cn(
            'text-sm font-semibold capitalize',
            visibility.lightPollution === 'low' ? 'text-emerald-400' :
            visibility.lightPollution === 'medium' ? 'text-yellow-400' : 'text-red-400'
          )}>
            {visibility.lightPollution}
          </span>
        </div>

        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Visibility</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-mono font-semibold">{Math.round(visibility.visibility / 1000)}</span>
            <span className="text-xs text-muted-foreground">km</span>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-3 bg-cyan/10 border border-cyan/30 rounded-lg">
        <p className="text-sm text-cyan">{visibility.recommendation}</p>
      </div>
    </div>
  );
};
