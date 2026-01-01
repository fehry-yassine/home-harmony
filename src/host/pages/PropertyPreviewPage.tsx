import { ArrowLeft, Eye, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { ImageGallery } from '@/components/ImageGallery';
import { AmenityGrid } from '@/components/AmenityGrid';
import { useProperty } from '@/hooks/useProperties';
import { PropertyStatusBadge } from '../components/PropertyStatusBadge';

interface PropertyPreviewPageProps {
  propertyId: string;
  onBack: () => void;
}

export function PropertyPreviewPage({ propertyId, onBack }: PropertyPreviewPageProps) {
  const { data: property, isLoading, error } = useProperty(propertyId);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground">Property not found</p>
        <button onClick={onBack} className="mt-4 text-primary underline">
          Go back
        </button>
      </div>
    );
  }

  // Prepare images - cover first, then sorted by display order
  const sortedImages = [...(property.images || [])].sort((a, b) => {
    if (a.is_cover && !b.is_cover) return -1;
    if (!a.is_cover && b.is_cover) return 1;
    return a.display_order - b.display_order;
  });
  const images = sortedImages.length > 0
    ? sortedImages.map(img => img.image_url)
    : ['/placeholder.svg'];

  // Prepare amenities for the grid
  const amenities = (property.amenities || []).map((name, i) => ({
    id: String(i),
    name,
    icon: 'check',
  }));

  return (
    <div className="animate-fade-in pb-24">
      {/* Preview Banner */}
      <div className="sticky top-0 z-20 bg-primary/10 px-4 py-2 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
          <Eye className="h-4 w-4" />
          Preview Mode — This is how renters will see your listing
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-72">
        <ImageGallery images={images} className="h-full" />
        
        {/* Top buttons */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          
          {/* Status badge */}
          <PropertyStatusBadge status={property.status} />
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
              <span className="text-sm">{property.address}, {property.city}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${Number(property.price).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4">
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
        {property.description && (
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-foreground">Description</h2>
            <p className="leading-relaxed text-muted-foreground">{property.description}</p>
          </div>
        )}

        {/* Area */}
        {property.area && Number(property.area) > 0 && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Maximize className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{Number(property.area).toLocaleString()} sq ft</p>
              <p className="text-sm text-muted-foreground">Total area</p>
            </div>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Amenities</h2>
            <AmenityGrid amenities={amenities} />
          </div>
        )}

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

      {/* Bottom CTA - Disabled in preview */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 p-4 backdrop-blur-md safe-area-bottom">
        <button 
          disabled
          className="w-full rounded-xl bg-muted py-4 text-center font-semibold text-muted-foreground cursor-not-allowed"
        >
          Contact Owner (Preview Only)
        </button>
      </div>
    </div>
  );
}
