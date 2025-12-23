import { PropertyCard } from '@/components/PropertyCard';
import { EmptyState } from '@/components/EmptyState';
import { PropertyCardSkeleton } from '@/components/Skeletons';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import { PropertyType } from '@/types';
import { PropertyWithImages } from '@/services/propertyService';

interface FavoritesPageProps {
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onPropertyClick: (id: string) => void;
  onExplore: () => void;
}

// Adapter to convert PropertyWithImages to Property type
function adaptProperty(p: PropertyWithImages) {
  return {
    id: p.id,
    title: p.title,
    price: Number(p.price),
    location: p.address,
    city: p.city,
    images: p.images.length > 0 
      ? p.images.sort((a, b) => a.display_order - b.display_order).map(i => i.image_url)
      : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80'],
    rating: 4.5 + Math.random() * 0.5,
    reviews_count: Math.floor(10 + Math.random() * 90),
    amenities: (p.amenities || []).map((name, i) => ({ id: String(i), name, icon: 'check' })),
    description: p.description || '',
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: Number(p.area),
    property_type: p.property_type as PropertyType,
    is_featured: false,
  };
}

export function FavoritesPage({ favorites, onFavoriteToggle, onPropertyClick, onExplore }: FavoritesPageProps) {
  const { user } = useAuth();
  const { data: favoriteProperties, isLoading } = useFavorites();

  // Show loading state
  if (isLoading) {
    return (
      <div className="animate-fade-in pb-24">
        <div className="p-4 pt-6">
          <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
        <div className="space-y-4 px-4">
          {[1, 2, 3].map((i) => (
            <PropertyCardSkeleton key={i} variant="compact" />
          ))}
        </div>
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return (
      <div className="animate-fade-in pb-24">
        <div className="p-4 pt-6">
          <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
          <p className="text-sm text-muted-foreground">0 saved properties</p>
        </div>
        <div className="px-4">
          <EmptyState
            type="favorites"
            action={{ label: 'Explore Properties', onClick: onExplore }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-24">
      <div className="p-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
        <p className="text-sm text-muted-foreground">{favoriteProperties?.length || 0} saved properties</p>
      </div>

      <div className="px-4">
        {(!favoriteProperties || favoriteProperties.length === 0) ? (
          <EmptyState
            type="favorites"
            action={{ label: 'Explore Properties', onClick: onExplore }}
          />
        ) : (
          <div className="space-y-4">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={adaptProperty(property)}
                isFavorite={true}
                onFavoriteToggle={onFavoriteToggle}
                onClick={onPropertyClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
