import { cn } from "@/lib/utils";

interface PropertyCardSkeletonProps {
  variant?: 'default' | 'featured' | 'compact';
}

export function PropertyCardSkeleton({ variant = 'default' }: PropertyCardSkeletonProps) {
  if (variant === 'featured') {
    return (
      <div className="w-72 flex-shrink-0 overflow-hidden rounded-2xl bg-card shadow-card">
        <div className="h-44 w-full animate-pulse bg-muted" />
        <div className="p-4">
          <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          <div className="mt-3 flex items-center justify-between">
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-3 rounded-xl bg-card p-3 shadow-card">
        <div className="h-20 w-20 flex-shrink-0 animate-pulse rounded-lg bg-muted" />
        <div className="flex flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="mb-1 h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="h-3 w-10 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card">
      <div className="h-48 w-full animate-pulse bg-muted" />
      <div className="p-4">
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

interface ScreenSkeletonProps {
  className?: string;
}

export function HomeSkeleton({ className }: ScreenSkeletonProps) {
  return (
    <div className={cn("space-y-6 p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
      </div>

      {/* Search */}
      <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />

      {/* Categories */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-muted" />
        ))}
      </div>

      {/* Featured */}
      <div>
        <div className="mb-3 h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="flex gap-4">
          <PropertyCardSkeleton variant="featured" />
          <PropertyCardSkeleton variant="featured" />
        </div>
      </div>

      {/* Nearby */}
      <div>
        <div className="mb-3 h-6 w-24 animate-pulse rounded bg-muted" />
        <div className="space-y-3">
          <PropertyCardSkeleton variant="compact" />
          <PropertyCardSkeleton variant="compact" />
        </div>
      </div>
    </div>
  );
}
