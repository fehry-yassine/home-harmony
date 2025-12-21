import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { CategoryChips } from '@/components/CategoryChip';
import { PropertyCard } from '@/components/PropertyCard';
import { EmptyState } from '@/components/EmptyState';
import { categories, searchProperties, getPropertiesByType } from '@/data/mockData';
import { PropertyType } from '@/types';

interface SearchPageProps {
  onPropertyClick: (id: string) => void;
  onBack: () => void;
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
}

export function SearchPage({ onPropertyClick, onBack, favorites, onFavoriteToggle }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyType | 'all'>('all');

  const filteredByType = getPropertiesByType(selectedCategory);
  const results = query ? searchProperties(query).filter(p => selectedCategory === 'all' || p.property_type === selectedCategory) : filteredByType;

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pt-6">
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <SearchBar
          value={query}
          onChange={setQuery}
          showFilter={true}
          autoFocus
          className="flex-1"
        />
      </div>

      {/* Categories */}
      <div className="px-4 pb-4">
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Results */}
      <div className="px-4">
        <p className="mb-3 text-sm text-muted-foreground">{results.length} properties found</p>
        {results.length === 0 ? (
          <EmptyState type="search" />
        ) : (
          <div className="space-y-4">
            {results.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
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
