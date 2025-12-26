import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'glow';
  blur?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  blur = 'md',
  className,
  children,
  ...props
}) => {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  const variantStyles = {
    default: 'bg-card/80 border-border/50',
    dark: 'bg-background/90 border-border/30',
    glow: 'bg-card/60 border-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.1)]'
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-all duration-300',
        blurValues[blur],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
