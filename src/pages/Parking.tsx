import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ParkingMap } from '@/components/ParkingMap';
import { Car, Clock, MapPin, Users, AlertTriangle } from 'lucide-react';
import { StatusIndicator } from '@/components/StatusIndicator';

const Parking = () => {
  // Generate parking spots - one per grid square (8x4 grid = 32 spots)
  const [parkingSpots] = useState(() => {
    const spots = [];
    let spotNumber = 1;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        spots.push({
          id: spotNumber.toString(),
          x: 10 + (col * 15), // 6% start + 11% spacing
          y: 40 + (row * 45), // 15% start + 20% spacing
          occupied: Math.random() > 0.6, // Random occupation
          spotNumber: spotNumber
        });
        spotNumber++;
      }
    }
    return spots;
  });

  const occupiedCount = parkingSpots.filter(spot => spot.occupied).length;
  const totalSpots = parkingSpots.length;
  const freeSpots = totalSpots - occupiedCount;
  const occupancyRate = (occupiedCount / totalSpots) * 100;

  // Mock recent activity
  const recentActivity = [
    { id: 1, spot: 3, action: 'Մուտք', time: '14:30', car: 'BMW X5' },
    { id: 2, spot: 8, action: 'Ելք', time: '14:15', car: 'Audi A4' },
    { id: 3, spot: 1, action: 'Մուտք', time: '13:45', car: 'Mercedes C-Class' },
    { id: 4, spot: 14, action: 'Մուտք', time: '13:20', car: 'Toyota Camry' }
  ];

  const handleSpotClick = (spot: any) => {
    console.log('Clicked spot:', spot);
    // Here you could show more details about the spot or its occupant
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Ավտոկայանի կառավարում</h1>
              <p className="text-muted-foreground">Ավտոկայանի տեղերի մոնիտորինգ իրական ժամանակում</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                {freeSpots} / {totalSpots}
              </div>
              <div className="text-sm text-muted-foreground">ազատ տեղ</div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <section className="mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatusIndicator
              label="Ընդհանուր տեղեր"
              value={totalSpots.toString()}
              status="active"
              icon={<MapPin className="w-4 h-4" />}
              description="Ընդհանուր քանակ"
            />
            <StatusIndicator
              label="Ազատ"
              value={freeSpots.toString()}
              status="active"
              icon={<Car className="w-4 h-4" />}
              description="Հասանելի հիմա"
            />
            <StatusIndicator
              label="Զբաղված"
              value={occupiedCount.toString()}
              status={occupiedCount > totalSpots * 0.8 ? "warning" : "inactive"}
              icon={<Users className="w-4 h-4" />}
              description="Զբաղված տեղեր"
            />
            <StatusIndicator
              label="Լրացվածություն"
              value={occupancyRate.toFixed(0)}
              unit="%"
              status={occupancyRate > 80 ? "danger" : occupancyRate > 60 ? "warning" : "active"}
              icon={<AlertTriangle className="w-4 h-4" />}
              description="Զբաղվածության տոկոս"
            />
          </div>
        </section>

        {/* Parking Map */}
        <section className="mb-8 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <ParkingMap 
            spots={parkingSpots}
            onSpotClick={handleSpotClick}
          />
        </section>

        {/* Recent Activity */}
        <section className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Վերջին գործունեություն
          </h2>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      activity.action === 'Մուտք' 
                        ? 'bg-destructive/20 text-destructive' 
                        : 'bg-success/20 text-success'
                    }`}>
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        Տեղ #{activity.spot} - {activity.action}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.car}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Parking;
