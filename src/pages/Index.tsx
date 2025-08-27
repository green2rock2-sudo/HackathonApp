import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { SmartHomeToggle } from '@/components/SmartHomeToggle';
import { StatusIndicator } from '@/components/StatusIndicator';
import { 
  DoorOpen, 
  DoorClosed, 
  Lightbulb, 
  Droplets, 
  Home,
  Settings,
  Activity
} from 'lucide-react';

const Index = () => {
  // State for doors and windows
  const [mainDoorOpen, setMainDoorOpen] = useState(false);
  const [windows, setWindows] = useState({
    living: false,
    kitchen: true,
    bedroom: false,
    bathroom: false
  });

  // State for lighting
  const [lights, setLights] = useState({
    living: true,
    kitchen: false,
    bedroom: true,
    bathroom: false,
    hallway: true
  });

  // State for water control
  const [waterSystems, setWaterSystems] = useState({
    main: true,
    hot: true,
    cold: true,
    irrigation: false
  });


  const handleWindowToggle = (room: string) => {
    setWindows(prev => ({ ...prev, [room]: !prev[room as keyof typeof prev] }));
  };

  const handleLightToggle = (room: string) => {
    setLights(prev => ({ ...prev, [room]: !prev[room as keyof typeof prev] }));
  };

  const handleWaterToggle = (system: string) => {
    setWaterSystems(prev => ({ ...prev, [system]: !prev[system as keyof typeof prev] }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Խելացի Տուն</h1>
                <p className="text-sm text-muted-foreground">Կառավարման և մոնիթորինգի համակարգ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-success">
                <Activity className="w-4 h-4" />
                <span>Առցանց</span>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Navigation />

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Main Door Control */}
        <section className="animate-slide-in">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Մուտքի կառավարում</h2>
          <SmartHomeToggle
            label="Главная дверь"
            description="Контроль входной двери"
            checked={mainDoorOpen}
            onCheckedChange={setMainDoorOpen}
            variant={mainDoorOpen ? 'success' : 'default'}
            icon={mainDoorOpen ? <DoorOpen className="w-5 h-5" /> : <DoorClosed className="w-5 h-5" />}
          />
        </section>
        {/* Windows Status */}
        <section className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Состояние окон</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(windows).map(([room, isOpen]) => (
              <StatusIndicator
                key={room}
                label={room === 'living' ? 'Հյուրասենյակ' : 
                        room === 'kitchen' ? 'Խոհանոց' : 
                        room === 'bedroom' ? 'նՆջասենյակ' : 'Լոգարան'}
                value={isOpen ? 'Բաց է' : 'Փակ է'}

                status={isOpen ? 'warning' : 'active'}
                icon={<DoorOpen className="w-4 h-4" />}
              />
            ))}
          </div>
        </section>

        {/* Lighting Control */}
        <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Լուսավորություն</h2>
          <div className="space-y-3">
            {Object.entries(lights).map(([room, isOn]) => (
              <SmartHomeToggle
                key={room}
                label={room === 'living' ? 'Հյուրասենյակ' : 
                         room === 'kitchen' ? 'Խոհանոց' : 
                         room === 'bedroom' ? 'Ննջասենյակ' : 
                         room === 'bathroom' ? 'Լոգարան' : 'Մուտքասրահ'}
                description={`Լուսավորությունը ${isOn ? 'Միացված է' : 'Անջատված է'}`}
                checked={isOn}
                onCheckedChange={() => handleLightToggle(room)}
                variant={isOn ? 'success' : 'default'}
                icon={<Lightbulb className="w-5 h-5" />}
              />
            ))}
          </div>
        </section>

        {/* Water Systems */}
        <section className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Ջրամատակարարում</h2>
          <div className="space-y-3">
            {Object.entries(waterSystems).map(([system, isOn]) => (
              <SmartHomeToggle
                key={system}
                label={system === 'main' ? 'Հիմնական մատակարարում' : 
                       system === 'hot' ? 'Տաք ջուր' : 
                       system === 'cold' ? 'Սառը ջուր' : 'Ոռոգում'}
                description={`${isOn ? 'Ակտիվ է' : 'Անջատված է'}`}
                checked={isOn}
                onCheckedChange={() => handleWaterToggle(system)}
                variant={isOn ? 'success' : system === 'main' ? 'danger' : 'default'}
                icon={<Droplets className="w-5 h-5" />}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Index;
