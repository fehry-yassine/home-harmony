import { Heart, Home, Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  type: 'favorites' | 'search' | 'properties';
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const icons = {
  favorites: <Heart className="h-16 w-16" />,
  search: <Search className="h-16 w-16" />,
  properties: <Home className="h-16 w-16" />,
};

const defaults = {
  favorites: {
    title: 'No favorites yet',
    description: 'Start exploring and save the properties you love',
  },
  search: {
    title: 'No results found',
    description: 'Try adjusting your search or filters',
  },
  properties: {
    title: 'No properties available',
    description: 'Check back later for new listings',
  },
};

export function EmptyState({
  type,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icons[type]}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {title || defaults[type].title}
      </h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">
        {description || defaults[type].description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
