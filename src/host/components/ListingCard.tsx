import { MapPin, MoreVertical, Pencil, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { HostListing } from '../types';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: HostListing;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ListingCard({ listing, onEdit, onToggleStatus, onDelete }: ListingCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-lg">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className="absolute left-3 top-3">
          <span className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            listing.status === 'published' 
              ? "bg-emerald-500/90 text-white" 
              : "bg-amber-500/90 text-white"
          )}>
            {listing.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Actions Menu */}
        <div className="absolute right-3 top-3">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)} 
              />
              <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-xl bg-card shadow-lg">
                <button
                  onClick={() => { onEdit(listing.id); setShowMenu(false); }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Property
                </button>
                <button
                  onClick={() => { onToggleStatus(listing.id); setShowMenu(false); }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  {listing.status === 'published' ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Publish
                    </>
                  )}
                </button>
                <button
                  onClick={() => { onDelete(listing.id); setShowMenu(false); }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1">{listing.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{listing.location}, {listing.city}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            ${listing.price.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </p>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>{listing.bedrooms} bed</span>
            <span>•</span>
            <span>{listing.bathrooms} bath</span>
          </div>
        </div>
      </div>
    </div>
  );
}
