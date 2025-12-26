import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Flame, Mountain, CloudLightning, Waves, Wind, Filter, X } from 'lucide-react';
import { NaturalEvent } from '@/services/apiTypes';

const categoryConfig: Record<NaturalEvent['category'], { icon: React.ReactNode; color: string; label: string }> = {
  wildfire: { icon: <Flame className="w-4 h-4" />, color: 'text-orange-400 bg-orange-400/20', label: 'Wildfires' },
  volcano: { icon: <Mountain className="w-4 h-4" />, color: 'text-red-400 bg-red-400/20', label: 'Volcanoes' },
  earthquake: { icon: <Wind className="w-4 h-4" />, color: 'text-yellow-400 bg-yellow-400/20', label: 'Earthquakes' },
  storm: { icon: <CloudLightning className="w-4 h-4" />, color: 'text-purple-400 bg-purple-400/20', label: 'Storms' },
  flood: { icon: <Waves className="w-4 h-4" />, color: 'text-blue-400 bg-blue-400/20', label: 'Floods' },
  iceberg: { icon: <Waves className="w-4 h-4" />, color: 'text-cyan bg-cyan/20', label: 'Icebergs' }
};

export const EarthEventsList: React.FC = () => {
  const { naturalEvents, selectedEvent, setSelectedEvent } = useSpaceStore();
  const [filter, setFilter] = React.useState<NaturalEvent['category'] | 'all'>('all');

  const filteredEvents = filter === 'all' 
    ? naturalEvents 
    : naturalEvents.filter(e => e.category === filter);

  const categoryCounts = naturalEvents.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-orange-400" />
        <span className="font-orbitron text-sm font-semibold">Earth Events</span>
        <span className="ml-auto text-xs text-muted-foreground">{naturalEvents.length} active</span>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1',
            filter === 'all' ? 'bg-cyan/20 text-cyan' : 'bg-muted/50 text-muted-foreground hover:text-foreground'
          )}
        >
          <Filter className="w-3 h-3" />
          All ({naturalEvents.length})
        </button>
        {Object.entries(categoryConfig).map(([key, config]) => {
          const count = categoryCounts[key] || 0;
          if (count === 0) return null;
          return (
            <button
              key={key}
              onClick={() => setFilter(key as NaturalEvent['category'])}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1',
                filter === key ? config.color : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {config.icon}
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Events List */}
      <div className="space-y-2">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <EarthEventCard 
              event={event} 
              isSelected={selectedEvent?.id === event.id}
              onSelect={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface EarthEventCardProps {
  event: NaturalEvent;
  isSelected: boolean;
  onSelect: () => void;
}

export const EarthEventCard: React.FC<EarthEventCardProps> = ({ event, isSelected, onSelect }) => {
  const config = categoryConfig[event.category];

  return (
    <div 
      onClick={onSelect}
      className={cn(
        'bg-card/60 backdrop-blur-sm border rounded-lg p-3 cursor-pointer transition-all',
        isSelected ? 'border-cyan bg-cyan/10' : 'border-border/50 hover:bg-card/80'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg', config.color)}>
          {config.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{event.title}</h4>
            {isSelected && (
              <X className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{new Date(event.date).toLocaleDateString()}</span>
            {event.magnitude && (
              <>
                <span>•</span>
                <span>{event.magnitude.toLocaleString()} acres</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              'text-xs px-2 py-0.5 rounded',
              event.status === 'active' ? 'bg-red-500/20 text-red-400' : 'bg-muted text-muted-foreground'
            )}>
              {event.status.toUpperCase()}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {event.coordinates[1].toFixed(2)}°, {event.coordinates[0].toFixed(2)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
