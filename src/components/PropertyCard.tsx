import { Property } from '@/types';
import { Heart, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClick?: (id: string) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export function PropertyCard({
  property,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
  variant = 'default',
}: PropertyCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(property.id);
  };

  if (variant === 'featured') {
    return (
      <div
        onClick={() => onClick?.(property.id)}
        className="relative w-72 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover active:scale-[0.98]"
      >
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200",
              isFavorite ? "text-favorite" : "text-muted-foreground hover:text-favorite"
            )}
          >
            <Heart
              className={cn("h-5 w-5 transition-all", isFavorite && "fill-current animate-heart-beat")}
            />
          </button>

          {/* Price badge */}
          <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-lg font-bold text-foreground">${property.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-1.5 truncate text-base font-semibold text-card-foreground">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate text-sm">{property.city}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-rating text-rating" />
              <span className="text-sm font-medium text-foreground">{property.rating}</span>
              <span className="text-sm text-muted-foreground">({property.reviews_count})</span>
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              {property.bedrooms > 0 && <span>{property.bedrooms} bed</span>}
              {property.bathrooms > 0 && <span>{property.bathrooms} bath</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        onClick={() => onClick?.(property.id)}
        className="flex cursor-pointer gap-3 rounded-xl bg-card p-3 shadow-card transition-all duration-300 hover:shadow-card-hover active:scale-[0.99]"
      >
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between py-0.5">
          <div>
            <h3 className="line-clamp-1 text-sm font-semibold text-card-foreground">
              {property.title}
            </h3>
            <div className="mt-0.5 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">{property.city}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary">${property.price.toLocaleString()}/mo</span>
            <div className="flex items-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-rating text-rating" />
              <span className="text-xs font-medium">{property.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      onClick={() => onClick?.(property.id)}
      className="cursor-pointer overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover active:scale-[0.99]"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200",
            isFavorite ? "text-favorite" : "text-muted-foreground hover:text-favorite"
          )}
        >
          <Heart
            className={cn("h-5 w-5 transition-all", isFavorite && "fill-current animate-heart-beat")}
          />
        </button>

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-lg font-bold text-foreground">${property.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/mo</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold text-card-foreground">{property.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.location}, {property.city}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-rating text-rating" />
            <span className="font-medium text-foreground">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews_count} reviews)</span>
          </div>
          <div className="flex gap-3 text-sm text-muted-foreground">
            {property.bedrooms > 0 && <span>{property.bedrooms} beds</span>}
            {property.bathrooms > 0 && <span>{property.bathrooms} baths</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
