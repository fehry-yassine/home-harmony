import { Plus, Building2, Eye, FileEdit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StatCard } from '../components/StatCard';
import { mockHostListings, getHostStats, mockHostUser } from '../data/mockData';
import { HostListing } from '../types';

interface HostDashboardProps {
  onAddProperty: () => void;
  onViewListings: () => void;
}

export function HostDashboard({ onAddProperty, onViewListings }: HostDashboardProps) {
  const [listings, setListings] = useState<HostListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setListings(mockHostListings);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = getHostStats(listings);
  const hasListings = listings.length > 0;

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 pt-8">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-2xl font-bold text-foreground">{mockHostUser.name} 👋</h1>
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
            value={stats.total_listings}
            icon={<Building2 className="h-5 w-5" />}
            variant="primary"
          />
          <StatCard
            title="Published"
            value={stats.published_listings}
            icon={<Eye className="h-5 w-5" />}
            variant="success"
          />
          <StatCard
            title="Drafts"
            value={stats.draft_listings}
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
            {listings.slice(0, 2).map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-4 rounded-2xl bg-card p-3 shadow-card"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground">${listing.price.toLocaleString()}/mo</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    listing.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {listing.status === 'published' ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
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
