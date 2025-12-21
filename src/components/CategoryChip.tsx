import { Category, PropertyType } from '@/types';
import { cn } from '@/lib/utils';
import { Home, Building2, Briefcase, LayoutGrid } from 'lucide-react';

interface CategoryChipProps {
  category: Category;
  isSelected?: boolean;
  onClick?: (id: PropertyType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-4 w-4" />,
  Building2: <Building2 className="h-4 w-4" />,
  Briefcase: <Briefcase className="h-4 w-4" />,
  LayoutGrid: <LayoutGrid className="h-4 w-4" />,
};

export function CategoryChip({ category, isSelected = false, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={() => onClick?.(category.id)}
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
        isSelected
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-card text-muted-foreground shadow-sm hover:bg-secondary hover:text-secondary-foreground"
      )}
    >
      <span className={cn(isSelected ? "text-primary-foreground" : "text-primary")}>
        {iconMap[category.icon]}
      </span>
      <span>{category.name}</span>
    </button>
  );
}

interface CategoryChipsProps {
  categories: Category[];
  selectedCategory: PropertyType | 'all';
  onCategoryChange: (category: PropertyType | 'all') => void;
}

export function CategoryChips({ categories, selectedCategory, onCategoryChange }: CategoryChipsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => onCategoryChange('all')}
        className={cn(
          "flex-shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
          selectedCategory === 'all'
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-card text-muted-foreground shadow-sm hover:bg-secondary"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isSelected={selectedCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
}
