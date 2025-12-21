import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onFilterClick?: () => void;
  placeholder?: string;
  className?: string;
  showFilter?: boolean;
  autoFocus?: boolean;
}

export function SearchBar({
  value = '',
  onChange,
  onFocus,
  onFilterClick,
  placeholder = 'Search location, city...',
  className,
  showFilter = true,
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="h-12 w-full rounded-xl bg-card pl-12 pr-4 text-foreground shadow-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        />
      </div>
      {showFilter && (
        <button
          onClick={onFilterClick}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
