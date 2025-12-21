import { ArrowLeft, Heart, Share2, MapPin, Star, Bed, Bath, Maximize } from 'lucide-react';
import { ImageGallery } from '@/components/ImageGallery';
import { AmenityGrid } from '@/components/AmenityGrid';
import { getPropertyById } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PropertyDetailsPageProps {
  propertyId: string;
  onBack: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

export function PropertyDetailsPage({ propertyId, onBack, isFavorite, onFavoriteToggle }: PropertyDetailsPageProps) {
  const property = getPropertyById(propertyId);

  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Property not found</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-24">
      {/* Image Gallery */}
      <div className="relative h-72">
        <ImageGallery images={property.images} className="h-full" />
        
        {/* Top buttons */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
              <Share2 className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => onFavoriteToggle(property.id)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm",
                isFavorite ? "text-favorite" : "text-foreground"
              )}
            >
              <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="-mt-6 rounded-t-3xl bg-background px-4 pt-6">
        {/* Title & Price */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{property.title}</h1>
            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{property.location}, {property.city}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 shadow-sm">
            <Star className="h-5 w-5 fill-rating text-rating" />
            <span className="font-semibold">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews_count})</span>
          </div>
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 shadow-sm">
              <Bed className="h-5 w-5 text-primary" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-sm text-muted-foreground">beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 shadow-sm">
              <Bath className="h-5 w-5 text-primary" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-sm text-muted-foreground">baths</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">Description</h2>
          <p className="leading-relaxed text-muted-foreground">{property.description}</p>
        </div>

        {/* Area */}
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Maximize className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{property.area.toLocaleString()} sq ft</p>
            <p className="text-sm text-muted-foreground">Total area</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Amenities</h2>
          <AmenityGrid amenities={property.amenities} />
        </div>

        {/* Map placeholder */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Location</h2>
          <div className="flex h-40 items-center justify-center rounded-xl bg-muted">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Map view</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 p-4 backdrop-blur-md safe-area-bottom">
        <button className="w-full rounded-xl bg-primary py-4 text-center font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.99]">
          Contact Owner
        </button>
      </div>
    </div>
  );
}
