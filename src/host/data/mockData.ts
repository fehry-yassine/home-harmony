// Host Mock Data

import { HostListing, HostStats } from '../types';
import { amenities } from '@/data/mockData';

export const mockHostListings: HostListing[] = [
  {
    id: 'host-1',
    title: 'Modern Downtown Loft',
    price: 2500,
    location: '123 Main Street',
    city: 'New York',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    ],
    amenities: amenities.slice(0, 4),
    description: 'Stunning modern loft in the heart of downtown with panoramic city views. Features high ceilings, exposed brick, and designer finishes throughout.',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    property_type: 'apartment',
    status: 'published',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    host_id: 'host-user-1',
  },
  {
    id: 'host-2',
    title: 'Cozy Garden Studio',
    price: 1200,
    location: '45 Oak Avenue',
    city: 'Brooklyn',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    amenities: amenities.slice(2, 5),
    description: 'Charming studio apartment with private garden access. Perfect for singles or couples looking for a peaceful retreat.',
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    property_type: 'studio',
    status: 'published',
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-02-05T11:15:00Z',
    host_id: 'host-user-1',
  },
  {
    id: 'host-3',
    title: 'Spacious Family Home',
    price: 4500,
    location: '789 Maple Drive',
    city: 'Queens',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    amenities: amenities,
    description: 'Beautiful 4-bedroom family home with a large backyard, modern kitchen, and finished basement. Located in a quiet, family-friendly neighborhood.',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    property_type: 'house',
    status: 'draft',
    created_at: '2024-02-10T15:00:00Z',
    updated_at: '2024-02-10T15:00:00Z',
    host_id: 'host-user-1',
  },
];

export const getHostStats = (listings: HostListing[]): HostStats => ({
  total_listings: listings.length,
  published_listings: listings.filter(l => l.status === 'published').length,
  draft_listings: listings.filter(l => l.status === 'draft').length,
});

export const mockHostUser = {
  id: 'host-user-1',
  name: 'Yassine',
  email: 'yassine@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
};
