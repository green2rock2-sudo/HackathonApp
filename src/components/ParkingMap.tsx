import React from 'react';
import { cn } from '@/lib/utils';
import { Car, MapPin } from 'lucide-react';

interface ParkingSpot {
  id: string;
  x: number;
  y: number;
  occupied: boolean;
  spotNumber: number;
}

interface ParkingMapProps {
  spots: ParkingSpot[];
  onSpotClick?: (spot: ParkingSpot) => void;
}

export const ParkingMap: React.FC<ParkingMapProps> = ({ spots, onSpotClick }) => {
  const occupiedCount = spots.filter(spot => spot.occupied).length;
  const totalSpots = spots.length;
  const freeSpots = totalSpots - occupiedCount;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Ավտոկայան</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          Ազատ: <span className="text-success font-medium">{freeSpots}</span> {totalSpots}-ից
        </div>
      </div>

      <div className="relative bg-muted/30 rounded-lg p-4 min-h-[300px]">
        {/* Parking grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-2 h-full p-4">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-muted-foreground rounded" />
            ))}
          </div>
        </div>

        {/* Parking spots */}
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={cn(
              'absolute w-12 h-8 rounded border-2 cursor-pointer transition-all duration-300 hover:scale-110',
              'flex items-center justify-center text-xs font-medium',
              spot.occupied
                ? 'bg-destructive/20 border-destructive text-destructive shadow-[0_0_10px_hsl(0_84%_60%_/_0.3)]'
                : 'bg-success/20 border-success text-success shadow-[0_0_10px_hsl(142_76%_36%_/_0.3)]'
            )}
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
            }}
            onClick={() => onSpotClick?.(spot)}
          >
            {spot.occupied ? (
              <Car className="w-4 h-4" />
            ) : (
              <span>{spot.spotNumber}</span>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-success/20 border border-success rounded" />
            <span className="text-success">Ազատ</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-destructive/20 border border-destructive rounded" />
            <span className="text-destructive">Զբաղված</span>
          </div>
        </div>
      </div>
    </div>
  );
};