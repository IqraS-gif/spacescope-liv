import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Activity, AlertTriangle, Zap, Sun, Shield } from 'lucide-react';

export const SolarGauge: React.FC = () => {
  const { cosmicWeather } = useSpaceStore();
  const kp = cosmicWeather.currentKpIndex;
  
  const getKpLevel = (kp: number) => {
    if (kp <= 2) return { label: 'Quiet', color: 'text-emerald-400', bg: 'bg-emerald-400' };
    if (kp <= 4) return { label: 'Unsettled', color: 'text-yellow-400', bg: 'bg-yellow-400' };
    if (kp <= 6) return { label: 'Storm', color: 'text-orange-400', bg: 'bg-orange-400' };
    if (kp <= 8) return { label: 'Severe Storm', color: 'text-red-400', bg: 'bg-red-400' };
    return { label: 'Extreme', color: 'text-red-600', bg: 'bg-red-600' };
  };

  const level = getKpLevel(kp);
  const percentage = (kp / 9) * 100;

  const getFlareInfo = (flareClass: string | null) => {
    if (!flareClass) return { level: 'None', color: 'text-muted-foreground', desc: 'No significant activity' };
    if (flareClass.startsWith('X')) return { level: 'Extreme', color: 'text-red-400', desc: 'Major radio blackouts' };
    if (flareClass.startsWith('M')) return { level: 'Moderate', color: 'text-orange-400', desc: 'Brief radio blackouts' };
    if (flareClass.startsWith('C')) return { level: 'Minor', color: 'text-yellow-400', desc: 'Small radio impact' };
    return { level: 'Background', color: 'text-emerald-400', desc: 'Normal activity' };
  };

  const flareInfo = getFlareInfo(cosmicWeather.currentFlareClass);

  return (
    <div className="space-y-4">
      {/* Kp Index Gauge */}
      <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan" />
            <span className="font-orbitron text-sm font-semibold">Geomagnetic Index</span>
          </div>
          <span className={cn('text-2xl font-mono font-bold', level.color)}>
            Kp {kp}
          </span>
        </div>

        {/* Gauge Bar */}
        <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn('h-full rounded-full', level.bg)}
          />
          {/* Scale markers */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-background/50"
              style={{ left: `${(i / 9) * 100}%` }}
            />
          ))}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Quiet</span>
          <span className={level.color}>{level.label}</span>
          <span>Extreme</span>
        </div>

        {/* Aurora visibility */}
        {kp >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-cyan/10 border border-cyan/30 rounded-lg flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-cyan" />
            <span className="text-sm text-cyan">Aurora may be visible at mid-latitudes</span>
          </motion.div>
        )}
      </div>

      {/* Solar Flare Status */}
      <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-orange-400" />
            <span className="font-orbitron text-sm font-semibold">Solar Flare Activity</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              cosmicWeather.currentFlareClass ? 'bg-orange-500/20' : 'bg-muted/50'
            )}>
              <Zap className={cn('w-8 h-8', flareInfo.color)} />
            </div>
            {cosmicWeather.currentFlareClass && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 animate-ping" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('text-xl font-mono font-bold', flareInfo.color)}>
                {cosmicWeather.currentFlareClass || 'NONE'}
              </span>
              <span className={cn('text-xs px-2 py-0.5 rounded', flareInfo.color, 
                cosmicWeather.currentFlareClass ? 'bg-current/20' : 'bg-muted'
              )}>
                {flareInfo.level}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{flareInfo.desc}</p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {(kp >= 6 || cosmicWeather.currentFlareClass?.startsWith('X')) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-sm font-semibold text-red-400">Space Weather Alert</p>
            <p className="text-xs text-muted-foreground">GPS and radio communications may be affected</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
