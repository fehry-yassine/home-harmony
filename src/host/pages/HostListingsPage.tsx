import { useState, useEffect } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { ListingCard } from '../components/ListingCard';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { mockHostListings } from '../data/mockData';
import { HostListing } from '../types';

interface HostListingsPageProps {
  onAddProperty: () => void;
  onEditProperty: (id: string) => void;
}

export function HostListingsPage({ onAddProperty, onEditProperty }: HostListingsPageProps) {
  const [listings, setListings] = useState<HostListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; listing: HostListing | null }>({
    isOpen: false,
    listing: null,
  });
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setListings(mockHostListings);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredListings = listings.filter((l) => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  const handleToggleStatus = (id: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: l.status === 'published' ? 'draft' : 'published' } : l
      )
    );
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.listing) {
      setListings((prev) => prev.filter((l) => l.id !== deleteModal.listing!.id));
      setDeleteModal({ isOpen: false, listing: null });
    }
  };

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
            <p className="text-sm text-muted-foreground">{listings.length} properties</p>
          </div>
          <button
            onClick={onAddProperty}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4">
        {(['all', 'published', 'draft'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {isLoading ? (
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onEdit={onEditProperty}
              onToggleStatus={handleToggleStatus}
              onDelete={(id) => {
                const listing = listings.find((l) => l.id === id);
                if (listing) setDeleteModal({ isOpen: true, listing });
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-semibold text-foreground">No {filter} listings</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {filter === 'all'
              ? 'Add your first property to get started.'
              : `You don't have any ${filter} listings yet.`}
          </p>
          {filter === 'all' && (
            <button
              onClick={onAddProperty}
              className="mt-4 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        propertyTitle={deleteModal.listing?.title || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, listing: null })}
      />
    </div>
  );
}
