import { useState, useRef, useCallback } from 'react';
import { Upload, X, Star, ImageIcon, Loader2, GripVertical } from 'lucide-react';
import { PropertyFormData } from '../../types';
import { cn } from '@/lib/utils';
import { uploadPropertyImage } from '@/services/hostService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Step5PhotosProps {
  data: PropertyFormData;
  onChange: (data: Partial<PropertyFormData>) => void;
  errors: Record<string, string>;
}

export function Step5Photos({ data, onChange, errors }: Step5PhotosProps) {
  const { user } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0 || !user) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      setIsUploading(false);
      return;
    }

    const uploadedUrls: string[] = [];
    
    for (let i = 0; i < validFiles.length; i++) {
      try {
        // userId is now securely obtained from auth session inside uploadPropertyImage
        const url = await uploadPropertyImage(validFiles[i]);
        uploadedUrls.push(url);
        setUploadProgress(((i + 1) / validFiles.length) * 100);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`Failed to upload ${validFiles[i].name}`);
      }
    }

    if (uploadedUrls.length > 0) {
      const newImages = [...data.images, ...uploadedUrls];
      onChange({ 
        images: newImages,
        cover_image_index: data.images.length === 0 ? 0 : data.cover_image_index
      });
      toast.success(`${uploadedUrls.length} photo${uploadedUrls.length > 1 ? 's' : ''} uploaded`);
    }

    setIsUploading(false);
    setUploadProgress(0);
  }, [user, data.images, data.cover_image_index, onChange]);

  const handleRemoveImage = (index: number) => {
    const newImages = data.images.filter((_, i) => i !== index);
    const newCoverIndex = index === data.cover_image_index
      ? 0
      : index < data.cover_image_index
        ? data.cover_image_index - 1
        : data.cover_image_index;
    onChange({ images: newImages, cover_image_index: Math.min(newCoverIndex, newImages.length - 1) });
  };

  const handleSetCover = (index: number) => {
    onChange({ cover_image_index: index });
  };

  // Drag and drop reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newImages = [...data.images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    
    // Update cover index if needed
    let newCoverIndex = data.cover_image_index;
    if (draggedIndex === data.cover_image_index) {
      newCoverIndex = index;
    } else if (draggedIndex < data.cover_image_index && index >= data.cover_image_index) {
      newCoverIndex = data.cover_image_index - 1;
    } else if (draggedIndex > data.cover_image_index && index <= data.cover_image_index) {
      newCoverIndex = data.cover_image_index + 1;
    }
    
    onChange({ images: newImages, cover_image_index: newCoverIndex });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="p-4">
      <p className="mb-4 text-sm text-muted-foreground">
        Add photos of your property. The cover image will be shown first in listings.
      </p>

      {/* Upload Zone */}
      <div
        className={cn(
          "relative rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          errors.images ? "border-destructive" : "",
          isUploading ? "pointer-events-none opacity-60" : ""
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileSelect(e.dataTransfer.files);
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        
        <div className="flex flex-col items-center">
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-3 font-medium text-foreground">
                Uploading... {Math.round(uploadProgress)}%
              </p>
              <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-muted">
                <div 
                  className="h-full bg-primary transition-all" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <p className="mt-3 font-medium text-foreground">
                Drag & drop your photos here
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse (max 10MB each)
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Select Photos
              </button>
            </>
          )}
        </div>
      </div>

      {errors.images && (
        <p className="mt-2 text-sm text-destructive">{errors.images}</p>
      )}

      {/* Image Grid */}
      {data.images.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {data.images.length} photo{data.images.length !== 1 ? 's' : ''} added
            </span>
            <span className="text-xs text-muted-foreground">
              Drag to reorder • Tap star for cover
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {data.images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group relative aspect-square cursor-move overflow-hidden rounded-xl transition-transform",
                  draggedIndex === index && "scale-105 opacity-50"
                )}
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

                {/* Drag handle indicator */}
                <div className="absolute right-1 top-1 rounded bg-black/50 p-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <GripVertical className="h-3 w-3 text-white" />
                </div>

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
              disabled={isUploading}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-primary disabled:opacity-50"
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
