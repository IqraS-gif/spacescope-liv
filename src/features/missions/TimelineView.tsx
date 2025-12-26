import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Rocket, Clock, MapPin, CheckCircle, XCircle, HelpCircle, ExternalLink } from 'lucide-react';
import { Launch } from '@/services/apiTypes';

export const TimelineView: React.FC = () => {
  const { launches } = useSpaceStore();

  const upcomingLaunches = launches.filter(l => new Date(l.net) > new Date());
  const pastLaunches = launches.filter(l => new Date(l.net) <= new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-5 h-5 text-cyan" />
        <span className="font-orbitron text-sm font-semibold">Mission Timeline</span>
      </div>

      {/* Upcoming Launches */}
      <div>
        <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Upcoming</h3>
        <div className="relative pl-4 border-l-2 border-cyan/30 space-y-4">
          {upcomingLaunches.map((launch, index) => (
            <motion.div
              key={launch.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-cyan border-2 border-background" />
              <LaunchCard launch={launch} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Launches */}
      {pastLaunches.length > 0 && (
        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recent</h3>
          <div className="relative pl-4 border-l-2 border-muted space-y-4">
            {pastLaunches.map((launch, index) => (
              <motion.div
                key={launch.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative opacity-70"
              >
                <div className={cn(
                  'absolute -left-[21px] top-0 w-3 h-3 rounded-full border-2 border-background',
                  launch.status.abbrev === 'Success' ? 'bg-emerald-500' : 'bg-red-500'
                )} />
                <LaunchCard launch={launch} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface LaunchCardProps {
  launch: Launch;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  const getStatusIcon = () => {
    switch (launch.status.abbrev) {
      case 'Go': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'Success': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'Failure': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <HelpCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = () => {
    switch (launch.status.abbrev) {
      case 'Go': return 'bg-emerald-500/20 text-emerald-400';
      case 'Success': return 'bg-emerald-500/20 text-emerald-400';
      case 'Failure': return 'bg-red-500/20 text-red-400';
      default: return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-3 hover:bg-card/80 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-sm line-clamp-1">{launch.name}</h4>
          <p className="text-xs text-muted-foreground">{launch.launch_service_provider.name}</p>
        </div>
        <span className={cn('text-xs px-2 py-0.5 rounded flex items-center gap-1', getStatusColor())}>
          {getStatusIcon()}
          {launch.status.abbrev}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDate(launch.net)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {launch.pad.location.name}
        </span>
      </div>

      {launch.mission && (
        <div className="p-2 bg-muted/30 rounded mb-2">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {launch.mission.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-cyan">{launch.mission.type}</span>
            {launch.mission.orbit && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{launch.mission.orbit.name}</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{launch.rocket.configuration.full_name}</span>
        {launch.webcast_live && (
          <span className="text-xs text-red-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE
          </span>
        )}
        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
