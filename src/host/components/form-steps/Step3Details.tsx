import { DollarSign, Bed, Bath, Maximize } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { cn } from '@/lib/utils';

interface Step3DetailsProps {
  data: PropertyFormData;
  onChange: (data: Partial<PropertyFormData>) => void;
  errors: Record<string, string>;
}

export function Step3Details({ data, onChange, errors }: Step3DetailsProps) {
  return (
    <div className="space-y-6 p-4">
      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Monthly Rent
        </label>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="number"
            value={data.price}
            onChange={(e) => onChange({ price: e.target.value ? Number(e.target.value) : '' })}
            placeholder="0"
            min="0"
            className={cn(
              "w-full rounded-xl border bg-background py-3 pl-10 pr-16 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.price ? "border-destructive" : "border-border"
            )}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-destructive">{errors.price}</p>
        )}
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Bedrooms
          </label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Bed className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="number"
              value={data.bedrooms}
              onChange={(e) => onChange({ bedrooms: e.target.value ? Number(e.target.value) : '' })}
              placeholder="0"
              min="0"
              max="20"
              className={cn(
                "w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                errors.bedrooms ? "border-destructive" : "border-border"
              )}
            />
          </div>
          {errors.bedrooms && (
            <p className="mt-1 text-sm text-destructive">{errors.bedrooms}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">
            Bathrooms
          </label>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Bath className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="number"
              value={data.bathrooms}
              onChange={(e) => onChange({ bathrooms: e.target.value ? Number(e.target.value) : '' })}
              placeholder="0"
              min="0"
              max="10"
              className={cn(
                "w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                errors.bathrooms ? "border-destructive" : "border-border"
              )}
            />
          </div>
          {errors.bathrooms && (
            <p className="mt-1 text-sm text-destructive">{errors.bathrooms}</p>
          )}
        </div>
      </div>

      {/* Area */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Total Area
        </label>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Maximize className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="number"
            value={data.area}
            onChange={(e) => onChange({ area: e.target.value ? Number(e.target.value) : '' })}
            placeholder="0"
            min="0"
            className={cn(
              "w-full rounded-xl border bg-background py-3 pl-10 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.area ? "border-destructive" : "border-border"
            )}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <span className="text-muted-foreground">m²</span>
          </div>
        </div>
        {errors.area && (
          <p className="mt-1 text-sm text-destructive">{errors.area}</p>
        )}
      </div>

      {/* Quick Stats Preview */}
      {(data.price || data.bedrooms || data.bathrooms || data.area) && (
        <div className="rounded-2xl bg-primary/5 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
            Property Summary
          </p>
          <div className="flex flex-wrap gap-3">
            {data.price && (
              <span className="rounded-lg bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm">
                ${Number(data.price).toLocaleString()}/mo
              </span>
            )}
            {data.bedrooms && (
              <span className="rounded-lg bg-background px-3 py-1.5 text-sm text-foreground shadow-sm">
                {data.bedrooms} bed
              </span>
            )}
            {data.bathrooms && (
              <span className="rounded-lg bg-background px-3 py-1.5 text-sm text-foreground shadow-sm">
                {data.bathrooms} bath
              </span>
            )}
            {data.area && (
              <span className="rounded-lg bg-background px-3 py-1.5 text-sm text-foreground shadow-sm">
                {Number(data.area).toLocaleString()} m²
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
