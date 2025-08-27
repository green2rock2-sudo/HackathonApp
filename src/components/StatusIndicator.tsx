import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  label: string;
  value: string | number;
  status: 'active' | 'inactive' | 'warning' | 'danger';
  icon?: React.ReactNode;
  unit?: string;
  description?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  label,
  value,
  status,
  icon,
  unit,
  description
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return {
          container: 'border-success/20 bg-success/5',
          indicator: 'bg-success shadow-[0_0_10px_hsl(142_76%_36%_/_0.5)]',
          text: 'text-success'
        };
      case 'warning':
        return {
          container: 'border-warning/20 bg-warning/5',
          indicator: 'bg-warning shadow-[0_0_10px_hsl(38_92%_50%_/_0.5)]',
          text: 'text-warning'
        };
      case 'danger':
        return {
          container: 'border-destructive/20 bg-destructive/5',
          indicator: 'bg-destructive shadow-[0_0_10px_hsl(0_84%_60%_/_0.5)]',
          text: 'text-destructive'
        };
      default:
        return {
          container: 'border-border bg-card',
          indicator: 'bg-muted-foreground',
          text: 'text-muted-foreground'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={cn(
      'p-4 rounded-xl border transition-all duration-300 hover:scale-105',
      styles.container
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && (
            <div className={cn('transition-colors duration-300', styles.text)}>
              {icon}
            </div>
          )}
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <div className={cn(
          'w-3 h-3 rounded-full animate-pulse',
          styles.indicator
        )} />
      </div>
      
      <div className="text-2xl font-bold text-foreground mb-1">
        {value}
        {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
      </div>
      
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
};