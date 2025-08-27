import React from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface SmartHomeToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const SmartHomeToggle: React.FC<SmartHomeToggleProps> = ({
  label,
  description,
  checked,
  onCheckedChange,
  variant = 'default',
  icon,
  disabled = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success/5 hover:bg-success/10';
      case 'danger':
        return 'border-destructive/20 bg-destructive/5 hover:bg-destructive/10';
      case 'warning':
        return 'border-warning/20 bg-warning/5 hover:bg-warning/10';
      default:
        return 'border-border bg-card hover:bg-muted/50';
    }
  };

  const getStatusColor = () => {
    if (!checked) return 'text-muted-foreground';
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'danger':
        return 'text-destructive';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };

  return (
    <div
      className={cn(
        'p-4 rounded-xl border transition-all duration-300 group',
        getVariantClasses(),
        disabled && 'opacity-50 cursor-not-allowed',
        checked && variant !== 'default' && 'shadow-glow'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn('transition-colors duration-300', getStatusColor())}>
              {icon}
            </div>
          )}
          <div>
            <div className="font-medium text-foreground">{label}</div>
            {description && (
              <div className="text-sm text-muted-foreground">{description}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn('text-sm font-medium transition-colors', getStatusColor())}>
            {checked ? 'Включен' : 'Выключен'}
          </span>
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
};