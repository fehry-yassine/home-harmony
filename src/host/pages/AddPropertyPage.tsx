import { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { StepIndicator } from '../components/StepIndicator';
import { Step1BasicInfo } from '../components/form-steps/Step1BasicInfo';
import { Step2Location } from '../components/form-steps/Step2Location';
import { Step3Details } from '../components/form-steps/Step3Details';
import { Step4Amenities } from '../components/form-steps/Step4Amenities';
import { Step5Photos } from '../components/form-steps/Step5Photos';
import { Step6Review } from '../components/form-steps/Step6Review';
import { PropertyFormData, initialFormData } from '../types';
import { toast } from 'sonner';

interface AddPropertyPageProps {
  onBack: () => void;
  onSuccess: () => void;
  editingId?: string;
}

export function AddPropertyPage({ onBack, onSuccess }: AddPropertyPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    } else if (currentStep === 5) {
      if (formData.images.length < 3) newErrors.images = 'Add at least 3 photos';
    }

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

  const handleSaveDraft = () => {
    toast.success('Property saved as draft');
    onSuccess();
  };

  const handlePublish = () => {
    toast.success('Property published successfully!');
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 p-4 backdrop-blur-md">
        <button onClick={handleBack} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-foreground">Add Property</h1>
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

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
          {currentStep < 6 ? (
            <button onClick={handleNext} className="flex-1 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground">
              Continue
            </button>
          ) : (
            <>
              <button onClick={handleSaveDraft} className="flex-1 rounded-xl border border-border py-3.5 font-semibold text-foreground">
                Save Draft
              </button>
              <button onClick={handlePublish} className="flex-1 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground">
                Publish
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
