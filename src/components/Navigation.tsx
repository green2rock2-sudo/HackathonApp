import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gauge, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation: React.FC = () => {
  const navItems = [
    {
      to: '/',
      icon: Home,
      label: 'Գլխավոր',
      description: 'Հիմնական համակարգեր'
    },
    {
      to: '/utilities',
      icon: Gauge,
      label: 'Հաշվիչներ',
      description: 'Գազ, Ջուր, Հոսանք'
    },
    {
      to: '/parking',
      icon: MapPin,
      label: 'Ավտոկայան',
      description: 'Ավտոկայանատեղիի քարտեզ'
    }
  ];

  return (
    <nav className="border-b border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                  'hover:bg-muted/50 border border-transparent',
                  isActive
                    ? 'bg-primary/10 border-primary/20 text-primary shadow-button'
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )} />
                  <div className="hidden sm:block">
                    <div className={cn(
                      'font-medium text-sm',
                      isActive ? 'text-primary' : 'text-foreground'
                    )}>
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
