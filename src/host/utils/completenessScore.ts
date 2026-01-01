import { PropertyFormData } from '../types';
import { PropertyWithImages } from '@/services/propertyService';

export interface CompletenessResult {
  score: number;
  percentage: number;
  completed: string[];
  missing: string[];
  warnings: QualityWarning[];
}

export interface QualityWarning {
  id: string;
  message: string;
  type: 'info' | 'warning';
}

interface CompletionCriteria {
  id: string;
  label: string;
  check: (data: PropertyFormData | PropertyWithImages) => boolean;
  weight: number;
}

const completionCriteria: CompletionCriteria[] = [
  {
    id: 'title',
    label: 'Title added',
    check: (data) => Boolean(data.title?.trim()),
    weight: 15,
  },
  {
    id: 'description',
    label: 'Description added',
    check: (data) => Boolean(
      'description' in data && typeof data.description === 'string'
        ? data.description?.trim()
        : false
    ),
    weight: 10,
  },
  {
    id: 'city',
    label: 'City specified',
    check: (data) => Boolean(data.city?.trim()),
    weight: 15,
  },
  {
    id: 'address',
    label: 'Address specified',
    check: (data) => Boolean(data.address?.trim()),
    weight: 10,
  },
  {
    id: 'price',
    label: 'Price set',
    check: (data) => {
      const price = 'price' in data ? Number(data.price) : 0;
      return price > 0;
    },
    weight: 15,
  },
  {
    id: 'bedrooms',
    label: 'Bedrooms specified',
    check: (data) => {
      const bedrooms = 'bedrooms' in data ? Number(data.bedrooms) : 0;
      return bedrooms >= 0 && bedrooms !== undefined;
    },
    weight: 5,
  },
  {
    id: 'bathrooms',
    label: 'Bathrooms specified',
    check: (data) => {
      const bathrooms = 'bathrooms' in data ? Number(data.bathrooms) : 0;
      return bathrooms >= 0 && bathrooms !== undefined;
    },
    weight: 5,
  },
  {
    id: 'images_min',
    label: 'At least 1 image',
    check: (data) => {
      if ('images' in data && Array.isArray(data.images)) {
        // PropertyFormData - images is string[]
        return data.images.length >= 1;
      }
      return false;
    },
    weight: 15,
  },
  {
    id: 'images_good',
    label: 'At least 3 images',
    check: (data) => {
      if ('images' in data && Array.isArray(data.images)) {
        return data.images.length >= 3;
      }
      return false;
    },
    weight: 10,
  },
];

export function calculateCompleteness(data: PropertyFormData): CompletenessResult {
  const completed: string[] = [];
  const missing: string[] = [];
  let earnedWeight = 0;
  const totalWeight = completionCriteria.reduce((sum, c) => sum + c.weight, 0);

  for (const criteria of completionCriteria) {
    if (criteria.check(data)) {
      completed.push(criteria.label);
      earnedWeight += criteria.weight;
    } else {
      missing.push(criteria.label);
    }
  }

  const percentage = Math.round((earnedWeight / totalWeight) * 100);
  const warnings = getQualityWarnings(data);

  return {
    score: earnedWeight,
    percentage,
    completed,
    missing,
    warnings,
  };
}

export function calculatePropertyCompleteness(property: PropertyWithImages): CompletenessResult {
  // Convert PropertyWithImages to a format we can check
  const data: PropertyFormData = {
    title: property.title,
    description: property.description || '',
    property_type: property.property_type,
    city: property.city,
    address: property.address,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area || '',
    amenities: property.amenities || [],
    images: property.images?.map(img => img.image_url) || [],
    cover_image_index: property.images?.findIndex(img => img.is_cover) ?? 0,
  };

  return calculateCompleteness(data);
}

function getQualityWarnings(data: PropertyFormData): QualityWarning[] {
  const warnings: QualityWarning[] = [];

  // Only 1 image
  if (data.images.length === 1) {
    warnings.push({
      id: 'single_image',
      message: 'Consider adding more photos to attract renters',
      type: 'info',
    });
  }

  // No description
  if (!data.description?.trim()) {
    warnings.push({
      id: 'no_description',
      message: 'A description helps renters understand your property',
      type: 'warning',
    });
  }

  // Very low price (less than $100)
  const price = Number(data.price);
  if (price > 0 && price < 100) {
    warnings.push({
      id: 'low_price',
      message: 'Price seems very low - is this correct?',
      type: 'info',
    });
  }

  // No amenities
  if (data.amenities.length === 0) {
    warnings.push({
      id: 'no_amenities',
      message: 'Adding amenities helps your listing stand out',
      type: 'info',
    });
  }

  return warnings;
}

export function getCompletenessColor(percentage: number): string {
  if (percentage >= 80) return 'text-emerald-600';
  if (percentage >= 50) return 'text-amber-600';
  return 'text-red-500';
}

export function getCompletenessBarColor(percentage: number): string {
  if (percentage >= 80) return 'bg-emerald-500';
  if (percentage >= 50) return 'bg-amber-500';
  return 'bg-red-500';
}
