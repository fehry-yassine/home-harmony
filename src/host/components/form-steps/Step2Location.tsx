import { MapPin } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { cn } from '@/lib/utils';

interface Step2LocationProps {
  data: PropertyFormData;
  onChange: (data: Partial<PropertyFormData>) => void;
  errors: Record<string, string>;
}

const popularCities = ['New York', 'Los Angeles', 'Miami', 'San Francisco', 'Chicago', 'Austin'];

export function Step2Location({ data, onChange, errors }: Step2LocationProps) {
  return (
    <div className="space-y-6 p-4">
      {/* City */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          City
        </label>
        <input
          type="text"
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="Enter city name"
          className={cn(
            "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            errors.city ? "border-destructive" : "border-border"
          )}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-destructive">{errors.city}</p>
        )}

        {/* Quick select cities */}
        <div className="mt-3 flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onChange({ city })}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                data.city === city
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Street Address
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="e.g., 123 Main Street, Apt 4B"
          className={cn(
            "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            errors.address ? "border-destructive" : "border-border"
          )}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-destructive">{errors.address}</p>
        )}
      </div>

      {/* Static Map Preview */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Location Preview
        </label>
        <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-muted">
          <div className="relative aspect-video">
            {data.city ? (
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-74.006,40.7128,11,0/600x300@2x?access_token=pk.placeholder`}
                alt="Map preview"
                className="h-full w-full object-cover opacity-50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : null}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {data.city && data.address
                  ? `${data.address}, ${data.city}`
                  : 'Enter location to preview'}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Map preview will be generated based on your address
        </p>
      </div>
    </div>
  );
}
