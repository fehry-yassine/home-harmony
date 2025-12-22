import { Home, Building2, LayoutGrid, Briefcase } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { PropertyType } from '@/types';
import { cn } from '@/lib/utils';

interface Step1BasicInfoProps {
  data: PropertyFormData;
  onChange: (data: Partial<PropertyFormData>) => void;
  errors: Record<string, string>;
}

const propertyTypes: { id: PropertyType; label: string; icon: React.ReactNode }[] = [
  { id: 'house', label: 'House', icon: <Home className="h-6 w-6" /> },
  { id: 'apartment', label: 'Apartment', icon: <Building2 className="h-6 w-6" /> },
  { id: 'studio', label: 'Studio', icon: <LayoutGrid className="h-6 w-6" /> },
  { id: 'office', label: 'Office', icon: <Briefcase className="h-6 w-6" /> },
];

export function Step1BasicInfo({ data, onChange, errors }: Step1BasicInfoProps) {
  return (
    <div className="space-y-6 p-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Property Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g., Modern Downtown Loft"
          className={cn(
            "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            errors.title ? "border-destructive" : "border-border"
          )}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Property Type
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange({ property_type: type.id })}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
                data.property_type === type.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              )}
            >
              {type.icon}
              <span className="text-sm font-medium">{type.label}</span>
            </button>
          ))}
        </div>
        {errors.property_type && (
          <p className="mt-1 text-sm text-destructive">{errors.property_type}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe your property, its features, and what makes it special..."
          rows={4}
          className={cn(
            "mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            errors.description ? "border-destructive" : "border-border"
          )}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {data.description.length}/500 characters
        </p>
        {errors.description && (
          <p className="mt-1 text-sm text-destructive">{errors.description}</p>
        )}
      </div>
    </div>
  );
}
