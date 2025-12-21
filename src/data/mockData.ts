import { Property, Category, OnboardingSlide, Amenity } from '@/types';

// Amenities
export const amenities: Amenity[] = [
  { id: 'wifi', name: 'WiFi', icon: 'Wifi' },
  { id: 'parking', name: 'Parking', icon: 'Car' },
  { id: 'pool', name: 'Pool', icon: 'Waves' },
  { id: 'gym', name: 'Gym', icon: 'Dumbbell' },
  { id: 'ac', name: 'A/C', icon: 'AirVent' },
  { id: 'laundry', name: 'Laundry', icon: 'WashingMachine' },
  { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat' },
  { id: 'balcony', name: 'Balcony', icon: 'Home' },
  { id: 'pet', name: 'Pet Friendly', icon: 'PawPrint' },
  { id: 'security', name: 'Security', icon: 'Shield' },
  { id: 'garden', name: 'Garden', icon: 'TreeDeciduous' },
  { id: 'furnished', name: 'Furnished', icon: 'Sofa' },
];

// Categories
export const categories: Category[] = [
  { id: 'house', name: 'House', icon: 'Home' },
  { id: 'apartment', name: 'Apartment', icon: 'Building2' },
  { id: 'office', name: 'Office', icon: 'Briefcase' },
  { id: 'studio', name: 'Studio', icon: 'LayoutGrid' },
];

// Onboarding slides
export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Find Your Perfect Home',
    description: 'Discover thousands of rental properties tailored to your lifestyle and budget.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 2,
    title: 'Easy Search & Filters',
    description: 'Use our powerful search to find exactly what you need. Filter by location, price, and amenities.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Save Your Favorites',
    description: 'Keep track of properties you love and compare them easily before making a decision.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
];

// Mock properties
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 4500,
    location: '123 Palm Avenue',
    city: 'Miami, FL',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    rating: 4.9,
    reviews_count: 128,
    amenities: [amenities[0], amenities[1], amenities[2], amenities[3], amenities[4], amenities[7]],
    description: 'Experience luxury living in this stunning modern villa. Featuring an open floor plan, floor-to-ceiling windows, and a private pool. The gourmet kitchen includes top-of-the-line appliances. Master suite with spa-like bathroom.',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    property_type: 'house',
    is_featured: true,
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 5800,
    location: '456 Skyline Tower',
    city: 'New York, NY',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    ],
    rating: 4.8,
    reviews_count: 89,
    amenities: [amenities[0], amenities[1], amenities[3], amenities[4], amenities[9], amenities[11]],
    description: 'Breathtaking penthouse with panoramic city views. This exclusive residence offers the ultimate urban luxury with private elevator access, chef\'s kitchen, and wraparound terrace.',
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    property_type: 'apartment',
    is_featured: true,
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    id: '3',
    title: 'Cozy Garden Apartment',
    price: 1850,
    location: '789 Oak Street',
    city: 'Austin, TX',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    rating: 4.7,
    reviews_count: 56,
    amenities: [amenities[0], amenities[5], amenities[6], amenities[8], amenities[10]],
    description: 'Charming apartment with private garden access. Perfect for pet lovers! Features updated kitchen, in-unit laundry, and beautiful natural light throughout.',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    property_type: 'apartment',
    is_featured: false,
    latitude: 30.2672,
    longitude: -97.7431,
  },
  {
    id: '4',
    title: 'Creative Loft Studio',
    price: 1400,
    location: '321 Arts District',
    city: 'Los Angeles, CA',
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
    ],
    rating: 4.6,
    reviews_count: 42,
    amenities: [amenities[0], amenities[4], amenities[6], amenities[11]],
    description: 'Industrial-chic loft in the heart of the arts district. Exposed brick, soaring ceilings, and abundant natural light create the perfect live/work space.',
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    property_type: 'studio',
    is_featured: true,
    latitude: 34.0407,
    longitude: -118.2468,
  },
  {
    id: '5',
    title: 'Executive Office Suite',
    price: 3200,
    location: '555 Business Park',
    city: 'San Francisco, CA',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    ],
    rating: 4.9,
    reviews_count: 34,
    amenities: [amenities[0], amenities[1], amenities[4], amenities[9]],
    description: 'Premium office space in prime business district. Includes reception area, private offices, conference room, and kitchenette. 24/7 security access.',
    bedrooms: 0,
    bathrooms: 2,
    area: 1800,
    property_type: 'office',
    is_featured: false,
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: '6',
    title: 'Beachfront Cottage',
    price: 2800,
    location: '101 Ocean Drive',
    city: 'San Diego, CA',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    rating: 4.8,
    reviews_count: 73,
    amenities: [amenities[0], amenities[1], amenities[6], amenities[7], amenities[8]],
    description: 'Wake up to stunning ocean views in this charming beachfront cottage. Step directly onto the sand from your private patio. Recently renovated with coastal-inspired design.',
    bedrooms: 2,
    bathrooms: 2,
    area: 1350,
    property_type: 'house',
    is_featured: true,
    latitude: 32.7157,
    longitude: -117.1611,
  },
  {
    id: '7',
    title: 'Urban Micro-Studio',
    price: 950,
    location: '222 Metro Center',
    city: 'Seattle, WA',
    images: [
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    rating: 4.5,
    reviews_count: 28,
    amenities: [amenities[0], amenities[3], amenities[4], amenities[5]],
    description: 'Efficiently designed micro-studio perfect for young professionals. Building amenities include rooftop lounge, gym, and co-working space.',
    bedrooms: 0,
    bathrooms: 1,
    area: 380,
    property_type: 'studio',
    is_featured: false,
    latitude: 47.6062,
    longitude: -122.3321,
  },
  {
    id: '8',
    title: 'Historic Brownstone',
    price: 3400,
    location: '445 Heritage Lane',
    city: 'Boston, MA',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    ],
    rating: 4.7,
    reviews_count: 61,
    amenities: [amenities[0], amenities[5], amenities[6], amenities[10], amenities[11]],
    description: 'Beautifully restored brownstone with original architectural details. Features exposed brick, working fireplace, and private garden. Located in historic neighborhood.',
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    property_type: 'house',
    is_featured: false,
    latitude: 42.3601,
    longitude: -71.0589,
  },
  {
    id: '9',
    title: 'Mountain View Cabin',
    price: 2100,
    location: '876 Alpine Road',
    city: 'Denver, CO',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    ],
    rating: 4.9,
    reviews_count: 47,
    amenities: [amenities[0], amenities[1], amenities[6], amenities[8], amenities[10]],
    description: 'Escape to this cozy mountain cabin with breathtaking views. Features stone fireplace, wraparound deck, and modern amenities while maintaining rustic charm.',
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    property_type: 'house',
    is_featured: true,
    latitude: 39.7392,
    longitude: -104.9903,
  },
  {
    id: '10',
    title: 'Tech Hub Office',
    price: 4500,
    location: '999 Innovation Way',
    city: 'Austin, TX',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    rating: 4.8,
    reviews_count: 52,
    amenities: [amenities[0], amenities[1], amenities[3], amenities[4], amenities[6], amenities[9]],
    description: 'State-of-the-art office space designed for tech companies. Open floor plan, phone booths, mother\'s room, and fully stocked kitchen. Fiber internet included.',
    bedrooms: 0,
    bathrooms: 3,
    area: 3500,
    property_type: 'office',
    is_featured: false,
    latitude: 30.2672,
    longitude: -97.7431,
  },
];

// Get featured properties
export const getFeaturedProperties = (): Property[] => {
  return mockProperties.filter(p => p.is_featured);
};

// Get nearby properties (mock - would use geolocation in real app)
export const getNearbyProperties = (): Property[] => {
  return mockProperties.slice(0, 6);
};

// Get properties by type
export const getPropertiesByType = (type: string): Property[] => {
  if (type === 'all') return mockProperties;
  return mockProperties.filter(p => p.property_type === type);
};

// Search properties
export const searchProperties = (query: string): Property[] => {
  const lowerQuery = query.toLowerCase();
  return mockProperties.filter(
    p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.city.toLowerCase().includes(lowerQuery) ||
      p.location.toLowerCase().includes(lowerQuery)
  );
};

// Get property by ID
export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(p => p.id === id);
};
