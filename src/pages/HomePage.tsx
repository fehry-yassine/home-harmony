import { useState } from 'react';
import { MapPin, Bell } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { CategoryChips } from '@/components/CategoryChip';
import { PropertyCard } from '@/components/PropertyCard';
import { categories, getFeaturedProperties, getNearbyProperties } from '@/data/mockData';
import { PropertyType } from '@/types';

interface HomePageProps {
  onPropertyClick: (id: string) => void;
  onSearchFocus: () => void;
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
}

export function HomePage({ onPropertyClick, onSearchFocus, favorites, onFavoriteToggle }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<PropertyType | 'all'>('all');
  const featuredProperties = getFeaturedProperties();
  const nearbyProperties = getNearbyProperties();

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

      {/* Featured Properties */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-lg font-semibold text-foreground">Featured</h2>
          <button className="text-sm font-medium text-primary">See all</button>
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              variant="featured"
              isFavorite={favorites.includes(property.id)}
              onFavoriteToggle={onFavoriteToggle}
              onClick={onPropertyClick}
            />
          ))}
        </div>
      </div>

      {/* Nearby Properties */}
      <div className="px-4">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold text-foreground">Nearby</h2>
          <button className="text-sm font-medium text-primary">See all</button>
        </div>
        <div className="space-y-3">
          {nearbyProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              variant="compact"
              isFavorite={favorites.includes(property.id)}
              onFavoriteToggle={onFavoriteToggle}
              onClick={onPropertyClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
