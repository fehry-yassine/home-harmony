// RentEase Type Definitions

export interface User {
  id: string;
  name: string;
  avatar_url: string;
  email?: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  images: string[];
  rating: number;
  reviews_count: number;
  amenities: Amenity[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  property_type: PropertyType;
  is_featured?: boolean;
  latitude?: number;
  longitude?: number;
}

export type PropertyType = 'house' | 'apartment' | 'office' | 'studio';

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Favorite {
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface Category {
  id: PropertyType;
  name: string;
  icon: string;
}

// Onboarding
export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}
