import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSpaceStore } from '@/stores/useSpaceStore';

interface SidebarProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  title?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = 'right',
  title
}) => {
  const { sidebarOpen, setSidebarOpen } = useSpaceStore();

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: sidebarOpen ? 320 : 48,
        transition: { type: 'spring', damping: 25, stiffness: 200 }
      }}
      className={cn(
        'fixed top-14 bottom-0 z-30 bg-card/95 backdrop-blur-lg border-border overflow-hidden',
        position === 'left' ? 'left-0 border-r' : 'right-0 border-l'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          'absolute top-4 z-10 p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors',
          position === 'left' ? 'right-2' : 'left-2',
          !sidebarOpen && 'left-1/2 -translate-x-1/2'
        )}
      >
        {sidebarOpen ? (
          position === 'left' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          position === 'left' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Content */}
      <div className={cn(
        'h-full pt-14 transition-opacity duration-200',
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}>
        {title && (
          <div className="px-4 pb-3 border-b border-border">
            <h2 className="font-orbitron text-sm font-semibold text-cyan tracking-wider">
              {title}
            </h2>
          </div>
        )}
        <div className="p-4 h-[calc(100%-3rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </motion.aside>
  );
};
