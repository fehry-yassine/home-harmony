import { useState } from 'react';
import { MapPin, Bell, Sparkles } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { CategoryChips } from '@/components/CategoryChip';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyCardSkeleton } from '@/components/Skeletons';
import { categories } from '@/data/mockData';
import { PropertyType } from '@/types';
import { usePublishedProperties } from '@/hooks/useProperties';
import { PropertyWithImages } from '@/services/propertyService';

interface HomePageProps {
  onPropertyClick: (id: string) => void;
  onSearchFocus: () => void;
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
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
    rating: 4.5 + Math.random() * 0.5, // Placeholder rating
    reviews_count: Math.floor(10 + Math.random() * 90),
    amenities: (p.amenities || []).map((name, i) => ({ id: String(i), name, icon: 'check' })),
    description: p.description || '',
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: Number(p.area),
    property_type: p.property_type as PropertyType,
    is_featured: p.is_promoted,
  };
}

export function HomePage({ onPropertyClick, onSearchFocus, favorites, onFavoriteToggle }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<PropertyType | 'all'>('all');
  const { data: properties, isLoading, error } = usePublishedProperties();

  const filteredProperties = properties?.filter(p => 
    selectedCategory === 'all' || p.property_type === selectedCategory
  ) || [];

  const featuredProperties = filteredProperties.filter(p => p.is_promoted).slice(0, 5);
  const nearbyProperties = filteredProperties.slice(0, 10);

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <div>
          <p className="text-sm text-muted-foreground">Current location</p>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold text-foreground">San Francisco, CA</span>
          </div>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-favorite" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <SearchBar onFocus={onSearchFocus} showFilter={false} />
      </div>

      {/* Categories */}
      <div className="px-4 pb-6">
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between px-4 pb-3">
              <h2 className="text-lg font-semibold text-foreground">Featured</h2>
            </div>
            <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
              {[1, 2, 3].map((i) => (
                <PropertyCardSkeleton key={i} variant="featured" />
              ))}
            </div>
          </div>
          <div className="px-4">
            <h2 className="mb-3 text-lg font-semibold text-foreground">Nearby</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <PropertyCardSkeleton key={i} variant="compact" />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!isLoading && filteredProperties.length === 0 && (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No properties found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            There are no properties available at the moment. Check back later!
          </p>
        </div>
      )}

      {/* Featured Properties */}
      {!isLoading && featuredProperties.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Featured</h2>
            </div>
            <button className="text-sm font-medium text-primary">See all</button>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={adaptProperty(property)}
                variant="featured"
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={onFavoriteToggle}
                onClick={onPropertyClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Nearby Properties */}
      {!isLoading && nearbyProperties.length > 0 && (
        <div className="px-4">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-lg font-semibold text-foreground">Nearby</h2>
            <button className="text-sm font-medium text-primary">See all</button>
          </div>
          <div className="space-y-3">
            {nearbyProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={adaptProperty(property)}
                variant="compact"
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={onFavoriteToggle}
                onClick={onPropertyClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
