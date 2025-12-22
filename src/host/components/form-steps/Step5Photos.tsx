import { useState, useRef } from 'react';
import { Upload, X, Star, ImageIcon } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { cn } from '@/lib/utils';

interface Step5PhotosProps {
  data: PropertyFormData;
  onChange: (data: Partial<PropertyFormData>) => void;
  errors: Record<string, string>;
}

// Sample placeholder images for demo
const sampleImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80',
];

export function Step5Photos({ data, onChange, errors }: Step5PhotosProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddSampleImages = () => {
    // For demo, add sample images
    const randomImages = sampleImages
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 3));
    onChange({ images: randomImages, cover_image_index: 0 });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = data.images.filter((_, i) => i !== index);
    const newCoverIndex = index === data.cover_image_index
      ? 0
      : index < data.cover_image_index
        ? data.cover_image_index - 1
        : data.cover_image_index;
    onChange({ images: newImages, cover_image_index: newCoverIndex });
  };

  const handleSetCover = (index: number) => {
    onChange({ cover_image_index: index });
  };

  return (
    <div className="p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Add at least 3 photos of your property. The first photo will be your cover image.
      </p>

      {/* Upload Zone */}
      <div
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          errors.images ? "border-destructive" : ""
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          // Handle file drop (in real app would upload files)
          handleAddSampleImages();
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={() => handleAddSampleImages()}
        />
        
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <p className="mt-3 font-medium text-foreground">
            Drag & drop your photos here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Select Photos
          </button>
        </div>
      </div>

      {/* Demo button */}
      {data.images.length === 0 && (
        <button
          type="button"
          onClick={handleAddSampleImages}
          className="mt-3 w-full rounded-xl border border-border py-2 text-sm text-muted-foreground hover:bg-secondary"
        >
          Add sample photos for demo
        </button>
      )}

      {errors.images && (
        <p className="mt-2 text-sm text-destructive">{errors.images}</p>
      )}

      {/* Image Grid */}
      {data.images.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {data.images.length} photos added
            </span>
            <span className="text-xs text-muted-foreground">
              Tap star to set cover
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {data.images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Cover badge */}
                {index === data.cover_image_index && (
                  <div className="absolute left-1 top-1 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                    Cover
                  </div>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => handleSetCover(index)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                      index === data.cover_image_index
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/90 text-foreground hover:bg-white"
                    )}
                  >
                    <Star className="h-4 w-4" fill={index === data.cover_image_index ? "currentColor" : "none"} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-destructive hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add more placeholder */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
            >
              <ImageIcon className="h-6 w-6" />
              <span className="mt-1 text-xs">Add more</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
