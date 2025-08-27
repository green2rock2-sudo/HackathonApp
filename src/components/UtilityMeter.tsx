import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface UtilityMeterProps {
  type: 'gas' | 'water' | 'electricity';
  currentValue: number;
  previousValue: number;
  unit: string;
  icon: React.ReactNode;
  cost?: number;
  currency?: string;
}

export const UtilityMeter: React.FC<UtilityMeterProps> = ({
  type,
  currentValue,
  previousValue,
  unit,
  icon,
  cost,
  currency = '֏'
}) => {
  const difference = currentValue - previousValue;
  const percentageChange = previousValue > 0 ? (difference / previousValue) * 100 : 0;
  const isIncreasing = difference > 0;

  const getTypeColor = () => {
    switch (type) {
      case 'gas':
        return 'text-warning';
      case 'water':
        return 'text-primary';
      case 'electricity':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTypeName = () => {
    switch (type) {
      case 'gas':
        return 'Գազ';
      case 'water':
        return 'Ջուր';
      case 'electricity':
        return 'Հոսանք';
      default:
        return '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300">
      <div className="flex items-center justify-etween mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg bg-muted/20', getTypeColor())}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{getTypeName()}</h3>
            <div className="text-sm text-muted-foreground">Ընթացիկ ցուցանիշներ</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-3xl font-bold text-foreground">
          {currentValue.toLocaleString()}
          <span className="text-lg text-muted-foreground ml-2">{unit}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            Նախորդ: {previousValue.toLocaleString()} {unit}
          </div>
          <div className={cn(
            'flex items-center gap-1 font-medium',
            isIncreasing ? 'text-destructive' : 'text-success'
          )}>
            <TrendingUp className={cn(
              'w-4 h-4',
              !isIncreasing && 'rotate-180'
            )} />
            {Math.abs(percentageChange).toFixed(1)}%
          </div>
        </div>

        {cost && (
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">եՆթակա է վճարման:</span>
              <span className="font-semibold text-foreground">
                {cost.toLocaleString()} {currency}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
