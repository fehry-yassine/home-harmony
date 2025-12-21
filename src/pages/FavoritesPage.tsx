import { PropertyCard } from '@/components/PropertyCard';
import { EmptyState } from '@/components/EmptyState';
import { mockProperties } from '@/data/mockData';

interface FavoritesPageProps {
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onPropertyClick: (id: string) => void;
  onExplore: () => void;
}

export function FavoritesPage({ favorites, onFavoriteToggle, onPropertyClick, onExplore }: FavoritesPageProps) {
  const favoriteProperties = mockProperties.filter(p => favorites.includes(p.id));

  return (
    <div className="animate-fade-in pb-24">
      <div className="p-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
        <p className="text-sm text-muted-foreground">{favorites.length} saved properties</p>
      </div>

      <div className="px-4">
        {favoriteProperties.length === 0 ? (
          <EmptyState
            type="favorites"
            action={{ label: 'Explore Properties', onClick: onExplore }}
          />
        ) : (
          <div className="space-y-4">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
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
