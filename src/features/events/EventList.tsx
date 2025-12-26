import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSpaceStore } from '@/stores/useSpaceStore';
import { Calendar, Star, Moon, Sun, Compass, Clock, Eye, ChevronRight } from 'lucide-react';
import { CelestialEvent } from '@/services/apiTypes';

const eventTypeIcons: Record<string, React.ReactNode> = {
  meteor_shower: <Star className="w-4 h-4" />,
  eclipse: <Moon className="w-4 h-4" />,
  conjunction: <Sun className="w-4 h-4" />,
  opposition: <Sun className="w-4 h-4" />,
  transit: <Compass className="w-4 h-4" />
};

const eventTypeColors: Record<string, string> = {
  meteor_shower: 'text-cyan bg-cyan/20 border-cyan/30',
  eclipse: 'text-purple-400 bg-purple-400/20 border-purple-400/30',
  conjunction: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
  opposition: 'text-orange-400 bg-orange-400/20 border-orange-400/30',
  transit: 'text-emerald-400 bg-emerald-400/20 border-emerald-400/30'
};

export const EventList: React.FC = () => {
  const { celestialEvents } = useSpaceStore();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff < 0) return 'Past';
    return `${diff} days`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan" />
          <span className="font-orbitron text-sm font-semibold">Upcoming Events</span>
        </div>
        <span className="text-xs text-muted-foreground">{celestialEvents.length} events</span>
      </div>

      {celestialEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EventCard event={event} daysUntil={getDaysUntil(event.date)} formatDate={formatDate} />
        </motion.div>
      ))}
    </div>
  );
};

interface EventCardProps {
  event: CelestialEvent;
  daysUntil: string;
  formatDate: (date: string) => string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, daysUntil, formatDate }) => {
  const typeColor = eventTypeColors[event.type] || 'text-muted-foreground bg-muted border-border';
  const typeIcon = eventTypeIcons[event.type] || <Star className="w-4 h-4" />;

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-3 hover:bg-card/80 transition-colors cursor-pointer group">
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg border', typeColor)}>
          {typeIcon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{event.name}</h4>
            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {event.time}
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {event.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn(
                'text-xs px-2 py-0.5 rounded',
                event.visibility === 'visible' ? 'bg-emerald-500/20 text-emerald-400' :
                event.visibility === 'partial' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              )}>
                <Eye className="w-3 h-3 inline mr-1" />
                {event.visibility}
              </span>
              {event.magnitude && (
                <span className="text-xs text-muted-foreground">
                  {event.magnitude}/hr
                </span>
              )}
            </div>
            <span className={cn(
              'text-xs font-mono',
              daysUntil === 'Today' ? 'text-cyan' :
              daysUntil === 'Tomorrow' ? 'text-yellow-400' :
              daysUntil === 'Past' ? 'text-muted-foreground' : 'text-foreground'
            )}>
              {daysUntil}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
