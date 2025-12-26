import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Activity, Zap, Wind, ThermometerSun } from 'lucide-react';
import { useSpaceStore } from '@/stores/useSpaceStore';

export const HUDOverlay: React.FC = () => {
  const { cosmicWeather, visibility, issData } = useSpaceStore();

  const getKpColor = (kp: number) => {
    if (kp <= 3) return 'text-emerald-400';
    if (kp <= 5) return 'text-yellow-400';
    if (kp <= 7) return 'text-orange-400';
    return 'text-red-400';
  };

  const getFlareColor = (flareClass: string | null) => {
    if (!flareClass) return 'text-muted-foreground';
    if (flareClass.startsWith('X')) return 'text-red-400';
    if (flareClass.startsWith('M')) return 'text-orange-400';
    if (flareClass.startsWith('C')) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  return (
    <>
      {/* Top Left - Cosmic Weather */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-20 left-4 z-20 pointer-events-auto"
      >
        <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-3 w-48">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
            <Activity className="w-4 h-4 text-cyan" />
            <span className="text-xs font-orbitron text-cyan tracking-wider">SOLAR WEATHER</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Kp Index</span>
              </div>
              <span className={cn('text-sm font-mono font-bold', getKpColor(cosmicWeather.currentKpIndex))}>
                {cosmicWeather.currentKpIndex}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Solar Flare</span>
              </div>
              <span className={cn('text-sm font-mono font-bold', getFlareColor(cosmicWeather.currentFlareClass))}>
                {cosmicWeather.currentFlareClass || 'NONE'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Right - Visibility */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed top-20 right-4 z-20 pointer-events-auto hidden lg:block"
      >
        <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-3 w-48">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
            <ThermometerSun className="w-4 h-4 text-cyan" />
            <span className="text-xs font-orbitron text-cyan tracking-wider">VISIBILITY</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Tonight</span>
              <span className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded',
                visibility.score === 'excellent' && 'bg-emerald-500/20 text-emerald-400',
                visibility.score === 'good' && 'bg-cyan/20 text-cyan',
                visibility.score === 'fair' && 'bg-yellow-500/20 text-yellow-400',
                visibility.score === 'poor' && 'bg-red-500/20 text-red-400'
              )}>
                {visibility.score.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Cloud Cover</span>
              <span className="text-xs font-mono">{visibility.cloudCover}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left - ISS Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-4 left-4 z-20 pointer-events-auto hidden md:block"
      >
        <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-orbitron text-cyan tracking-wider">ISS LIVE</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span className="text-muted-foreground">LAT</span>
            <span className="font-mono">{issData.latitude.toFixed(2)}°</span>
            <span className="text-muted-foreground">LNG</span>
            <span className="font-mono">{issData.longitude.toFixed(2)}°</span>
            <span className="text-muted-foreground">ALT</span>
            <span className="font-mono">{issData.altitude} km</span>
            <span className="text-muted-foreground">VEL</span>
            <span className="font-mono">{issData.velocity} km/s</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
