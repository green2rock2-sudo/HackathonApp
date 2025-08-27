import React from 'react';
import { Navigation } from '@/components/Navigation';
import { UtilityMeter } from '@/components/UtilityMeter';
import { Flame, Droplets, Zap, TrendingUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const Utilities = () => {
  // Mock data for monthly consumption
  const monthlyData = {
    gas: [ [
      { month: 'Հնվ', value: 145, cost: 2100 },
      { month: 'Փտվ', value: 156, cost: 2280 },
      { month: 'Մրտ', value: 134, cost: 1950 },
      { month: 'Ապր', value: 128, cost: 1840 },
      { month: 'Մայ', value: 89, cost: 1290 },
      { month: 'Հնս', value: 67, cost: 970 }
      ],
    water: [
      { month: 'Հնվ', value: 12, cost: 850 },
      { month: 'Փտվ', value: 14, cost: 980 },
      { month: 'Մրտ', value: 11, cost: 770 },
      { month: 'Ապր', value: 13, cost: 910 },
      { month: 'Մայ', value: 15, cost: 1050 },
      { month: 'Հնս', value: 16, cost: 1120 }
      ],
    electricity: [
      { month: 'Հնվ', value: 234, cost: 2800 },
      { month: 'Փտվ', value: 267, cost: 3200 },
      { month: 'Մրտ', value: 198, cost: 2380 },
      { month: 'Ապր', value: 189, cost: 2270 },
      { month: 'Մայ', value: 201, cost: 2410 },
      { month: 'Հնս', value: 223, cost: 2680 }
      ]
      /*{ month: 'Янв', value: 145, cost: 2100 },
      { month: 'Фев', value: 156, cost: 2280 },
      { month: 'Мар', value: 134, cost: 1950 },
      { month: 'Апр', value: 128, cost: 1840 },
      { month: 'Май', value: 89, cost: 1290 },
      { month: 'Июн', value: 67, cost: 970 }
    ],
    water: [
      { month: 'Янв', value: 12, cost: 850 },
      { month: 'Фев', value: 14, cost: 980 },
      { month: 'Мар', value: 11, cost: 770 },
      { month: 'Апр', value: 13, cost: 910 },
      { month: 'Май', value: 15, cost: 1050 },
      { month: 'Июн', value: 16, cost: 1120 }
    ],
    electricity: [
      { month: 'Янв', value: 234, cost: 2800 },
      { month: 'Фев', value: 267, cost: 3200 },
      { month: 'Мар', value: 198, cost: 2380 },
      { month: 'Апр', value: 189, cost: 2270 },
      { month: 'Май', value: 201, cost: 2410 },
      { month: 'Июн', value: 223, cost: 2680 }
    ]
  };
  */

  const totalMonthlyCost = monthlyData.gas[5].cost + monthlyData.water[5].cost + monthlyData.electricity[5].cost;
  const previousMonthlyCost = monthlyData.gas[4].cost + monthlyData.water[4].cost + monthlyData.electricity[4].cost;
  const costDifference = totalMonthlyCost - previousMonthlyCost;
  const costChangePercent = (costDifference / previousMonthlyCost) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <div className="flex items-center justify-between">
            <div>
              {/*<h1 className="text-3xl font-bold text-foreground mb-2">Счётчики коммунальных услуг</h1> */}
              {/*<p className="text-muted-foreground">Мониторинг потребления и расчёт стоимости</p> */}
              <h1 className="text-3xl font-bold text-foreground mb-2">Կոմունալ ծառայությունների հաշվիչներ</h1>
              <p className="text-muted-foreground">Սպառման մոնիթորինգ և արժեքի հաշվարկ</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                {totalMonthlyCost.toLocaleString()} ₽
              </div>
              <div className={cn(
                'flex items-center justify-end gap-1 text-sm font-medium',
                costDifference > 0 ? 'text-destructive' : 'text-success'
              )}>
                <TrendingUp className={cn(
                  'w-4 h-4',
                  costDifference <= 0 && 'rotate-180'
                )} />
                {Math.abs(costChangePercent).toFixed(1)}% նախորդ ամսվա համեմատ
              </div>
            </div>
          </div>
        </div>

        {/* Current Meters */}
        <section className="mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-semibold mb-6 text-foreground">Ընթացիկ ցուցանիշներh2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UtilityMeter
              type="gas"
              currentValue={1547}
              previousValue={1523}
              unit="м³"
              icon={<Flame className="w-5 h-5" />}
              cost={2340}
            />
            <UtilityMeter
              type="water"
              currentValue={89}
              previousValue={86}
              unit="м³"
              icon={<Droplets className="w-5 h-5" />}
              cost={1200}
            />
            <UtilityMeter
              type="electricity"
              currentValue={2847}
              previousValue={2821}
              unit="кВт⋅ч"
              icon={<Zap className="w-5 h-5" />}
              cost={3150}
            />
          </div>
        </section>

        {/* Monthly Statistics */}
        <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Ամսական վիճակագրություն
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gas Statistics */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Flame className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">Գազ</h3>
              </div>
              <div className="space-y-3">
                {monthlyData.gas.slice(-3).map((data, index) => (
                  <div key={data.month} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{data.month}</span>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{data.value} մ³</div>
                      <div className="text-xs text-muted-foreground">{data.cost.toLocaleString()} ֏</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Water Statistics */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Droplets className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Ջուր</h3>
              </div>
              <div className="space-y-3">
                {monthlyData.water.slice(-3).map((data, index) => (
                  <div key={data.month} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{data.month}</span>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{data.value} մ³</div>
                      <div className="text-xs text-muted-foreground">{data.cost.toLocaleString()} ֏</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Electricity Statistics */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Zap className="w-5 h-5 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">Հոսանք</h3>
              </div>
              <div className="space-y-3">
                {monthlyData.electricity.slice(-3).map((data, index) => (
                  <div key={data.month} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{data.month}</span>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{data.value} կՎտ/ժ</div>
                      <div className="text-xs text-muted-foreground">{data.cost.toLocaleString()} <֏/div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Utilities;