import { useState, useEffect } from 'react';
import { ArrowLeft, X, Loader2 } from 'lucide-react';
import { Step1BasicInfo } from '../components/form-steps/Step1BasicInfo';
import { Step2Location } from '../components/form-steps/Step2Location';
import { Step3Details } from '../components/form-steps/Step3Details';
import { Step4Amenities } from '../components/form-steps/Step4Amenities';
import { Step5Photos } from '../components/form-steps/Step5Photos';
import { Step6Review } from '../components/form-steps/Step6Review';
import { PublishValidationModal } from '../components/PublishValidationModal';
import { PropertyFormData, initialFormData } from '../types';
import { toast } from 'sonner';
import { useCreateProperty, useUpdateProperty, useProperty, useTogglePropertyStatus } from '@/hooks/useProperties';
import { useAuth } from '@/contexts/AuthContext';

interface AddPropertyPageProps {
  onBack: () => void;
  onSuccess: () => void;
  editingId?: string;
}

export function AddPropertyPage({ onBack, onSuccess, editingId }: AddPropertyPageProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPublishModal, setShowPublishModal] = useState(false);
  
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const toggleStatus = useTogglePropertyStatus();
  const { data: existingProperty, isLoading: isLoadingProperty } = useProperty(editingId || null);

  // Load existing property data when editing
  useEffect(() => {
    if (editingId && existingProperty) {
      setFormData({
        title: existingProperty.title,
        property_type: existingProperty.property_type,
        description: existingProperty.description || '',
        city: existingProperty.city,
        address: existingProperty.address,
        price: existingProperty.price,
        bedrooms: existingProperty.bedrooms,
        bathrooms: existingProperty.bathrooms,
        area: existingProperty.area || '',
        amenities: existingProperty.amenities || [],
        images: existingProperty.images?.map(img => img.image_url) || [],
        cover_image_index: existingProperty.images?.findIndex(img => img.is_cover) ?? 0,
      });
    }
  }, [editingId, existingProperty]);

  const updateFormData = (data: Partial<PropertyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setErrors({});
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.property_type) newErrors.property_type = 'Select a property type';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    } else if (currentStep === 2) {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    } else if (currentStep === 3) {
      if (!formData.price) newErrors.price = 'Price is required';
      if (!formData.bedrooms && formData.bedrooms !== 0) newErrors.bedrooms = 'Required';
      if (!formData.bathrooms && formData.bathrooms !== 0) newErrors.bathrooms = 'Required';
    }
    // Step 4 (amenities) is optional
    // Step 5 (photos) - no hard validation, but needed for publish

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = async () => {
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description || null,
        property_type: formData.property_type as 'house' | 'apartment' | 'studio' | 'office',
        city: formData.city,
        address: formData.address,
        price: Number(formData.price) || 0,
        bedrooms: Number(formData.bedrooms) || 1,
        bathrooms: Number(formData.bathrooms) || 1,
        area: formData.area ? Number(formData.area) : null,
        amenities: formData.amenities,
        status: 'draft' as const,
        owner_id: user.id,
      };

      if (editingId) {
        await updateProperty.mutateAsync({
          id: editingId,
          updates: propertyData,
          imageUrls: formData.images,
          coverIndex: formData.cover_image_index,
        });
        toast.success('Property updated successfully');
      } else {
        await createProperty.mutateAsync({
          property: propertyData,
          imageUrls: formData.images,
          coverIndex: formData.cover_image_index,
        });
        toast.success('Property saved as draft');
      }
      
      onSuccess();
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property');
    }
  };

  const handlePublish = async () => {
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description || null,
        property_type: formData.property_type as 'house' | 'apartment' | 'studio' | 'office',
        city: formData.city,
        address: formData.address,
        price: Number(formData.price) || 0,
        bedrooms: Number(formData.bedrooms) || 1,
        bathrooms: Number(formData.bathrooms) || 1,
        area: formData.area ? Number(formData.area) : null,
        amenities: formData.amenities,
        status: 'published' as const,
        owner_id: user.id,
      };

      if (editingId) {
        await updateProperty.mutateAsync({
          id: editingId,
          updates: propertyData,
          imageUrls: formData.images,
          coverIndex: formData.cover_image_index,
        });
        toast.success('Property published successfully!');
      } else {
        await createProperty.mutateAsync({
          property: propertyData,
          imageUrls: formData.images,
          coverIndex: formData.cover_image_index,
        });
        toast.success('Property published successfully!');
      }
      
      setShowPublishModal(false);
      onSuccess();
    } catch (error) {
      console.error('Error publishing property:', error);
      toast.error('Failed to publish property');
    }
  };

  const isSubmitting = createProperty.isPending || updateProperty.isPending;
  const isEditing = !!editingId;
  const pageTitle = isEditing ? 'Edit Property' : 'Add Property';

  // Show loading state when loading existing property
  if (editingId && isLoadingProperty) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalSteps = 6;
  const stepLabels = ['Basic Info', 'Location', 'Details', 'Amenities', 'Photos', 'Review'];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 p-4 backdrop-blur-md">
        <button onClick={handleBack} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-foreground">{pageTitle}</h1>
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Step Indicator */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {stepLabels.map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  index + 1 === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index + 1 < currentStep
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-1 text-xs text-muted-foreground hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 w-full rounded-full bg-muted">
          <div
            className="h-1 rounded-full bg-primary transition-all"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <div className="animate-fade-in">
        {currentStep === 1 && <Step1BasicInfo data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 2 && <Step2Location data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 3 && <Step3Details data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 4 && <Step4Amenities data={formData} onChange={updateFormData} />}
        {currentStep === 5 && <Step5Photos data={formData} onChange={updateFormData} errors={errors} />}
        {currentStep === 6 && <Step6Review data={formData} />}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background p-4">
        <div className="mx-auto flex max-w-lg gap-3">
          {currentStep < totalSteps ? (
            <button 
              onClick={handleNext} 
              className="flex-1 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground"
            >
              Continue
            </button>
          ) : (
            <>
              <button 
                onClick={handleSaveDraft} 
                disabled={isSubmitting}
                className="flex-1 rounded-xl border border-border py-3.5 font-semibold text-foreground disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  'Save as Draft'
                )}
              </button>
              <button 
                onClick={() => setShowPublishModal(true)} 
                disabled={isSubmitting}
                className="flex-1 rounded-xl bg-emerald-500 py-3.5 font-semibold text-white disabled:opacity-50"
              >
                Publish
              </button>
            </>
          )}
        </div>
      </div>

      {/* Publish Validation Modal */}
      <PublishValidationModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={handlePublish}
        formData={formData}
        isPublishing={isSubmitting}
      />
    </div>
  );
}
