// Host Panel Type Definitions

import { Property, PropertyType, Amenity } from '@/types';

export type ListingStatus = 'draft' | 'published';

export interface HostListing extends Omit<Property, 'rating' | 'reviews_count' | 'is_featured'> {
  status: ListingStatus;
  created_at: string;
  updated_at: string;
  host_id: string;
}

export interface HostStats {
  total_listings: number;
  published_listings: number;
  draft_listings: number;
}

// Form data for creating/editing a property
export interface PropertyFormData {
  // Step 1: Basic Info
  title: string;
  property_type: PropertyType | '';
  description: string;
  
  // Step 2: Location
  city: string;
  address: string;
  
  // Step 3: Property Details
  price: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  area: number | '';
  
  // Step 4: Amenities
  amenities: string[];
  
  // Step 5: Photos
  images: string[];
  cover_image_index: number;
}

export const initialFormData: PropertyFormData = {
  title: '',
  property_type: '',
  description: '',
  city: '',
  address: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  amenities: [],
  images: [],
  cover_image_index: 0,
};

export type HostTabId = 'dashboard' | 'listings' | 'add-property' | 'profile';

export interface FormStep {
  id: number;
  title: string;
  description: string;
}

export const formSteps: FormStep[] = [
  { id: 1, title: 'Basic Info', description: 'Property name and type' },
  { id: 2, title: 'Location', description: 'Where is it located?' },
  { id: 3, title: 'Details', description: 'Price and specifications' },
  { id: 4, title: 'Amenities', description: 'What does it offer?' },
  { id: 5, title: 'Photos', description: 'Show it off' },
  { id: 6, title: 'Review', description: 'Ready to publish?' },
];
