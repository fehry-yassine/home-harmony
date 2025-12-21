import { Amenity } from '@/types';
import {
  Wifi,
  Car,
  Waves,
  Dumbbell,
  AirVent,
  WashingMachine,
  ChefHat,
  Home,
  PawPrint,
  Shield,
  TreeDeciduous,
  Sofa,
} from 'lucide-react';

interface AmenityGridProps {
  amenities: Amenity[];
  variant?: 'default' | 'compact';
}

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="h-5 w-5" />,
  Car: <Car className="h-5 w-5" />,
  Waves: <Waves className="h-5 w-5" />,
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  AirVent: <AirVent className="h-5 w-5" />,
  WashingMachine: <WashingMachine className="h-5 w-5" />,
  ChefHat: <ChefHat className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  PawPrint: <PawPrint className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  TreeDeciduous: <TreeDeciduous className="h-5 w-5" />,
  Sofa: <Sofa className="h-5 w-5" />,
};

export function AmenityGrid({ amenities, variant = 'default' }: AmenityGridProps) {
  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
          >
            <span className="text-primary">{iconMap[amenity.icon]}</span>
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {amenities.map((amenity) => (
        <div
          key={amenity.id}
          className="flex flex-col items-center gap-2 rounded-xl bg-secondary p-4 text-center"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {iconMap[amenity.icon]}
          </div>
          <span className="text-sm font-medium text-secondary-foreground">{amenity.name}</span>
        </div>
      ))}
    </div>
  );
}
