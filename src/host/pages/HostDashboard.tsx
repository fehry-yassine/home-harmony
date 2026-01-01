import { Plus, Building2, Eye, FileEdit } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { NeedsAttentionCard } from '../components/NeedsAttentionCard';
import { useAuth } from '@/contexts/AuthContext';
import { useHostProperties } from '@/hooks/useProperties';
import { PropertyWithImages } from '@/services/propertyService';
import { calculatePropertyCompleteness } from '../utils/completenessScore';

interface HostDashboardProps {
  onAddProperty: () => void;
  onViewListings: () => void;
  onEditProperty: (id: string) => void;
}

export function HostDashboard({ onAddProperty, onViewListings, onEditProperty }: HostDashboardProps) {
  const { profile } = useAuth();
  const { data: properties = [], isLoading } = useHostProperties();

  const userName = profile?.name || 'Host';
  
  // Calculate stats from real data
  const stats = {
    total: properties.length,
    published: properties.filter((p: PropertyWithImages) => p.status === 'published').length,
    drafts: properties.filter((p: PropertyWithImages) => p.status === 'draft').length,
  };

  // Count properties missing requirements
  const incompleteCount = properties.filter((p: PropertyWithImages) => {
    const completeness = calculatePropertyCompleteness(p);
    return completeness.percentage < 80;
  }).length;

  const hasListings = properties.length > 0;
  const recentListings = properties.slice(0, 2);

  // Helper to get cover image or first image
  const getCoverImage = (property: PropertyWithImages): string => {
    const cover = property.images?.find(img => img.is_cover);
    if (cover) return cover.image_url;
    if (property.images?.length > 0) return property.images[0].image_url;
    return '/placeholder.svg';
  };

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 pt-8">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-2xl font-bold text-foreground">{userName} 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your rental properties
        </p>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 p-4">
          <StatCard
            title="Total"
            value={stats.total}
            icon={<Building2 className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            title="Published"
            value={stats.published}
            icon={<Eye className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={<FileEdit className="h-5 w-5" />}
            variant="warning"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4">
        <button
          onClick={onAddProperty}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Add New Property
        </button>
      </div>

      {/* Needs Attention Section */}
      {!isLoading && hasListings && incompleteCount > 0 && (
        <NeedsAttentionCard 
          properties={properties} 
          onEditProperty={onEditProperty}
        />
      )}

      {/* Content */}
      {isLoading ? (
        <div className="p-4">
          <div className="h-48 animate-pulse rounded-2xl bg-muted" />
        </div>
      ) : hasListings ? (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Listings</h2>
            <button
              onClick={onViewListings}
              className="text-sm font-medium text-primary"
            >
              View All
            </button>
          </div>

          {/* Recent listings preview */}
          <div className="mt-4 space-y-3">
            {recentListings.map((property) => {
              const completeness = calculatePropertyCompleteness(property);
              return (
                <div
                  key={property.id}
                  className="flex items-center gap-4 rounded-2xl bg-card p-3 shadow-card"
                >
                  <img
                    src={getCoverImage(property)}
                    alt={property.title}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{property.title}</h3>
                    <p className="text-sm text-muted-foreground">${property.price.toLocaleString()}/mo</p>
                    {/* Completeness mini bar */}
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-1 w-16 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full ${
                            completeness.percentage >= 80 ? 'bg-emerald-500' :
                            completeness.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${completeness.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{completeness.percentage}%</span>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      property.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    {property.status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No Properties Yet</h3>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Start listing your properties and reach thousands of potential renters.
          </p>
          <button
            onClick={onAddProperty}
            className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            <Plus className="h-5 w-5" />
            List Your First Property
          </button>
        </div>
      )}
    </div>
  );
}
