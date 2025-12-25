import { Plus, Building2, MapPin, Pencil } from 'lucide-react';
import { useHostProperties } from '@/hooks/useProperties';
import { PropertyWithImages } from '@/services/propertyService';
import { cn } from '@/lib/utils';

interface HostListingsPageProps {
  onAddProperty: () => void;
  onEditProperty: (id: string) => void;
}

export function HostListingsPage({ onAddProperty, onEditProperty }: HostListingsPageProps) {
  const { data: properties = [], isLoading } = useHostProperties();

  // Helper to get cover image or first image
  const getCoverImage = (property: PropertyWithImages): string => {
    const cover = property.images?.find(img => img.is_cover);
    if (cover) return cover.image_url;
    if (property.images?.length > 0) return property.images[0].image_url;
    return '/placeholder.svg';
  };

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
            <p className="text-sm text-muted-foreground">{properties.length} properties</p>
          </div>
          <button
            onClick={onAddProperty}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      {isLoading ? (
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-lg"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={getCoverImage(property)}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Status Badge */}
                <div className="absolute left-3 top-3">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    property.status === 'published' 
                      ? "bg-emerald-500/90 text-white" 
                      : "bg-amber-500/90 text-white"
                  )}>
                    {property.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => onEditProperty(property.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1">{property.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="line-clamp-1">{property.city}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    ${property.price.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{property.bedrooms} bed</span>
                    <span>•</span>
                    <span>{property.bathrooms} bath</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold text-foreground">No listings yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first property to get started.
          </p>
          <button
            onClick={onAddProperty}
            className="mt-4 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </button>
        </div>
      )}
    </div>
  );
}
