import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Satellite, Users, Globe, Timer, Radio, MapPin } from 'lucide-react';

export const ISSTracker: React.FC = () => {
  const { issData, updateISSPosition } = useSpaceStore();

  // Simulate ISS movement
  useEffect(() => {
    const interval = setInterval(() => {
      updateISSPosition();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateISSPosition]);

  const formatCoord = (value: number, isLat: boolean) => {
    const direction = isLat 
      ? (value >= 0 ? 'N' : 'S')
      : (value >= 0 ? 'E' : 'W');
    return `${Math.abs(value).toFixed(4)}° ${direction}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Satellite className="w-6 h-6 text-cyan" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan animate-ping" />
        </div>
        <div>
          <span className="font-orbitron text-sm font-semibold">ISS Tracker</span>
          <p className="text-xs text-muted-foreground">Live Position Data</p>
        </div>
      </div>

      {/* Position Card */}
      <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">Current Position</span>
          <span className="text-xs text-cyan flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              Latitude
            </div>
            <motion.span 
              key={issData.latitude}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-lg font-mono font-semibold text-cyan"
            >
              {formatCoord(issData.latitude, true)}
            </motion.span>
          </div>

          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Globe className="w-3 h-3" />
              Longitude
            </div>
            <motion.span 
              key={issData.longitude}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-lg font-mono font-semibold text-cyan"
            >
              {formatCoord(issData.longitude, false)}
            </motion.span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
              <Timer className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Altitude</p>
              <p className="text-sm font-mono">{issData.altitude} km</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
              <Radio className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Velocity</p>
              <p className="text-sm font-mono">{issData.velocity} km/s</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crew Card */}
      <div className="bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-cyan" />
          <span className="text-sm font-semibold">Crew on Board</span>
          <span className="ml-auto text-xs text-muted-foreground">{issData.crew.length} astronauts</span>
        </div>

        <div className="space-y-2">
          {issData.crew.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan/30 to-purple-500/30 flex items-center justify-center text-sm font-semibold">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.nationality}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Orbit Info */}
      <div className="p-3 bg-muted/30 rounded-lg flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Orbit Number</span>
        <span className="text-sm font-mono text-cyan">#{issData.orbitNumber}</span>
      </div>
    </div>
  );
};
