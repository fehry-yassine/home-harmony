import { MapPin, Bed, Bath, Maximize, Check } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { amenities as allAmenities } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface Step6ReviewProps {
  data: PropertyFormData;
}

export function Step6Review({ data }: Step6ReviewProps) {
  const selectedAmenities = allAmenities.filter((a) => data.amenities.includes(a.id));

  return (
    <div className="p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Review your listing before publishing
      </p>

      {/* Property Card Preview */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* Cover Image */}
        {data.images.length > 0 ? (
          <div className="relative aspect-video">
            <img
              src={data.images[data.cover_image_index] || data.images[0]}
              alt={data.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {data.images.length} photos
            </div>
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-muted">
            <span className="text-muted-foreground">No photos added</span>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {data.title || 'Untitled Property'}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {data.address ? `${data.address}, ` : ''}
                  {data.city || 'No location set'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">
                ${data.price ? Number(data.price).toLocaleString() : '0'}
              </p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{data.bedrooms || 0} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{data.bathrooms || 0} bath</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{data.area ? Number(data.area).toLocaleString() : 0} m²</span>
            </div>
          </div>

          {/* Description */}
          {data.description && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {data.description}
              </p>
            </div>
          )}

          {/* Amenities */}
          {selectedAmenities.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {selectedAmenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity.id}
                    className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    {amenity.name}
                  </span>
                ))}
                {selectedAmenities.length > 4 && (
                  <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                    +{selectedAmenities.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-6 rounded-2xl bg-primary/5 p-4">
        <h4 className="text-sm font-semibold text-foreground">Listing Checklist</h4>
        <div className="mt-3 space-y-2">
          {[
            { label: 'Property title', done: !!data.title },
            { label: 'Property type', done: !!data.property_type },
            { label: 'Location', done: !!data.city && !!data.address },
            { label: 'Price & details', done: !!data.price && !!data.bedrooms && !!data.bathrooms },
            { label: 'At least 3 photos', done: data.images.length >= 3 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full",
                  item.done ? "bg-emerald-500" : "bg-muted"
                )}
              >
                {item.done && <Check className="h-3 w-3 text-white" />}
              </div>
              <span
                className={cn(
                  "text-sm",
                  item.done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
