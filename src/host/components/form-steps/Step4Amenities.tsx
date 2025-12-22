import { Wifi, Car, Waves, Dumbbell, AirVent, WashingMachine, ChefHat, Home, PawPrint, Shield, TreeDeciduous, Sofa, LucideIcon } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { cn } from '@/lib/utils';

interface Step4AmenitiesProps {
  data: PropertyFormData;
  onChange: (data: Partial<PropertyFormData>) => void;
}

const iconMap: Record<string, LucideIcon> = {
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
};

const amenityOptions = [
  { id: 'wifi', name: 'WiFi', icon: 'Wifi' },
  { id: 'parking', name: 'Parking', icon: 'Car' },
  { id: 'pool', name: 'Pool', icon: 'Waves' },
  { id: 'gym', name: 'Gym', icon: 'Dumbbell' },
  { id: 'ac', name: 'A/C', icon: 'AirVent' },
  { id: 'laundry', name: 'Laundry', icon: 'WashingMachine' },
  { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat' },
  { id: 'balcony', name: 'Balcony', icon: 'Home' },
  { id: 'pet', name: 'Pet Friendly', icon: 'PawPrint' },
  { id: 'security', name: 'Security', icon: 'Shield' },
  { id: 'garden', name: 'Garden', icon: 'TreeDeciduous' },
  { id: 'furnished', name: 'Furnished', icon: 'Sofa' },
];

export function Step4Amenities({ data, onChange }: Step4AmenitiesProps) {
  const toggleAmenity = (id: string) => {
    const current = data.amenities;
    const updated = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    onChange({ amenities: updated });
  };

  return (
    <div className="p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Select all amenities that your property offers
      </p>

      <div className="grid grid-cols-3 gap-3">
        {amenityOptions.map((amenity) => {
          const Icon = iconMap[amenity.icon];
          const isSelected = data.amenities.includes(amenity.id);

          return (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-3 transition-all",
                isSelected
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              {Icon && <Icon className="h-5 w-5" />}
              <span className="text-xs font-medium">{amenity.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected count */}
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          {data.amenities.length} amenities selected
        </span>
      </div>
    </div>
  );
}
