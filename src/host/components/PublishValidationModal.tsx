import { AlertTriangle, Check, X, Image, DollarSign, MapPin, Bed, Bath, FileText } from 'lucide-react';
import { PropertyFormData } from '../types';
import { cn } from '@/lib/utils';

interface PublishValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: PropertyFormData;
  isPublishing?: boolean;
}

interface ValidationItem {
  label: string;
  isValid: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export function PublishValidationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  formData,
  isPublishing = false
}: PublishValidationModalProps) {
  if (!isOpen) return null;

  const validationItems: ValidationItem[] = [
    { label: 'Title', isValid: !!formData.title.trim(), icon: FileText },
    { label: 'Price', isValid: !!formData.price && Number(formData.price) > 0, icon: DollarSign },
    { label: 'City', isValid: !!formData.city.trim(), icon: MapPin },
    { label: 'Address', isValid: !!formData.address.trim(), icon: MapPin },
    { label: 'Bedrooms', isValid: formData.bedrooms !== '' && Number(formData.bedrooms) >= 0, icon: Bed },
    { label: 'Bathrooms', isValid: formData.bathrooms !== '' && Number(formData.bathrooms) >= 0, icon: Bath },
    { label: 'At least 1 image', isValid: formData.images.length >= 1, icon: Image },
  ];

  const allValid = validationItems.every(item => item.isValid);
  const invalidCount = validationItems.filter(item => !item.isValid).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-fade-in rounded-2xl bg-card p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {allValid ? 'Ready to Publish' : 'Cannot Publish Yet'}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status indicator */}
        <div className={cn(
          "mb-6 flex items-center gap-3 rounded-xl p-4",
          allValid ? "bg-emerald-500/10" : "bg-amber-500/10"
        )}>
          {allValid ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
              <Check className="h-5 w-5 text-white" />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          )}
          <div>
            <p className={cn(
              "font-medium",
              allValid ? "text-emerald-600" : "text-amber-600"
            )}>
              {allValid 
                ? 'All requirements met!' 
                : `${invalidCount} requirement${invalidCount > 1 ? 's' : ''} missing`
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {allValid 
                ? 'Your property is ready to go live.' 
                : 'Complete the following to publish.'
              }
            </p>
          </div>
        </div>

        {/* Validation checklist */}
        <div className="mb-6 space-y-2">
          {validationItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 transition-colors",
                item.isValid ? "bg-muted/50" : "bg-destructive/5"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4",
                item.isValid ? "text-muted-foreground" : "text-destructive"
              )} />
              <span className={cn(
                "flex-1 text-sm",
                item.isValid ? "text-foreground" : "text-destructive"
              )}>
                {item.label}
              </span>
              {item.isValid ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <X className="h-4 w-4 text-destructive" />
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-3 font-medium text-foreground hover:bg-muted"
          >
            {allValid ? 'Cancel' : 'Go Back & Fix'}
          </button>
          {allValid && (
            <button
              onClick={onConfirm}
              disabled={isPublishing}
              className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              {isPublishing ? 'Publishing...' : 'Publish Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
