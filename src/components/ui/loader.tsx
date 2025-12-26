import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'pulse' | 'orbit';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'orbit') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-cyan/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan animate-spin" />
        <div className="absolute inset-[25%] rounded-full bg-cyan/50 animate-pulse" />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-cyan/20 animate-ping" />
        <div className="absolute inset-[20%] rounded-full bg-cyan/60" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-full border-2 border-muted border-t-cyan animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );
};
