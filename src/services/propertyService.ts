import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PropertyRow = Database['public']['Tables']['properties']['Row'];
type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
type PropertyUpdate = Database['public']['Tables']['properties']['Update'];
type PropertyImageRow = Database['public']['Tables']['property_images']['Row'];

export interface PropertyWithImages extends PropertyRow {
  images: PropertyImageRow[];
  is_promoted?: boolean;
}

export interface SearchFilters {
  city?: string;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
}

// Fetch all published properties
export async function getPublishedProperties(): Promise<PropertyWithImages[]> {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Check for active promotions
  const now = new Date().toISOString();
  const { data: promotions } = await supabase
    .from('promotions')
    .select('property_id')
    .eq('is_active', true)
    .lte('start_date', now)
    .gte('end_date', now);

  const promotedIds = new Set(promotions?.map(p => p.property_id) || []);

  return (properties || []).map(p => ({
    ...p,
    images: p.images || [],
    is_promoted: promotedIds.has(p.id),
  })).sort((a, b) => {
    // Promoted properties first
    if (a.is_promoted && !b.is_promoted) return -1;
    if (!a.is_promoted && b.is_promoted) return 1;
    return 0;
  });
}

// Search properties with filters
export async function searchProperties(filters: SearchFilters): Promise<PropertyWithImages[]> {
  let query = supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('status', 'published');

  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters.property_type && filters.property_type !== 'all') {
    query = query.eq('property_type', filters.property_type as 'house' | 'apartment' | 'studio' | 'office');
  }

  if (filters.min_price !== undefined) {
    query = query.gte('price', filters.min_price);
  }

  if (filters.max_price !== undefined) {
    query = query.lte('price', filters.max_price);
  }

  if (filters.bedrooms !== undefined) {
    query = query.gte('bedrooms', filters.bedrooms);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map(p => ({
    ...p,
    images: p.images || [],
  }));
}

// Get single property
export async function getProperty(id: string): Promise<PropertyWithImages | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    ...data,
    images: data.images || [],
  };
}

// Get host's properties
export async function getHostProperties(ownerId: string): Promise<PropertyWithImages[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('owner_id', ownerId)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return (data || []).map(p => ({
    ...p,
    images: p.images || [],
  }));
}

// Create property
export async function createProperty(
  property: Omit<PropertyInsert, 'id' | 'created_at' | 'updated_at'>,
  imageUrls: string[],
  coverIndex: number = 0
): Promise<PropertyWithImages> {
  const { data: newProperty, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single();

  if (error) throw error;

  // Add images
  if (imageUrls.length > 0) {
    const imageInserts = imageUrls.map((url, index) => ({
      property_id: newProperty.id,
      image_url: url,
      is_cover: index === coverIndex,
      display_order: index,
    }));

    await supabase.from('property_images').insert(imageInserts);
  }

  return getProperty(newProperty.id) as Promise<PropertyWithImages>;
}

// Update property
export async function updateProperty(
  id: string,
  updates: PropertyUpdate,
  imageUrls?: string[],
  coverIndex?: number
): Promise<PropertyWithImages> {
  const { error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id);

  if (error) throw error;

  // Update images if provided
  if (imageUrls !== undefined) {
    // Delete existing images
    await supabase.from('property_images').delete().eq('property_id', id);

    // Add new images
    if (imageUrls.length > 0) {
      const imageInserts = imageUrls.map((url, index) => ({
        property_id: id,
        image_url: url,
        is_cover: index === (coverIndex ?? 0),
        display_order: index,
      }));

      await supabase.from('property_images').insert(imageInserts);
    }
  }

  return getProperty(id) as Promise<PropertyWithImages>;
}

// Delete property
export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Toggle property status (draft <-> published)
export async function togglePropertyStatus(id: string, currentStatus: string): Promise<void> {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  
  const { error } = await supabase
    .from('properties')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) throw error;
}

// Update property status directly
export async function updatePropertyStatus(
  id: string, 
  status: 'draft' | 'published' | 'archived'
): Promise<void> {
  const { error } = await supabase
    .from('properties')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}

// Check if property can be published
export interface PublishValidation {
  canPublish: boolean;
  missingFields: string[];
}

export async function validatePropertyForPublish(id: string): Promise<PublishValidation> {
  const property = await getProperty(id);
  
  if (!property) {
    return { canPublish: false, missingFields: ['Property not found'] };
  }

  const missingFields: string[] = [];

  if (!property.title?.trim()) missingFields.push('Title');
  if (!property.price || Number(property.price) <= 0) missingFields.push('Price');
  if (!property.city?.trim()) missingFields.push('City');
  if (!property.address?.trim()) missingFields.push('Address');
  if (property.bedrooms === undefined || property.bedrooms === null) missingFields.push('Bedrooms');
  if (property.bathrooms === undefined || property.bathrooms === null) missingFields.push('Bathrooms');
  if (!property.images || property.images.length === 0) missingFields.push('At least 1 image');

  return {
    canPublish: missingFields.length === 0,
    missingFields,
  };
}

// Track property view
export async function trackPropertyView(propertyId: string, userId?: string): Promise<void> {
  await supabase
    .from('property_views')
    .insert({
      property_id: propertyId,
      user_id: userId || null,
    });
}

// Get featured properties (promoted or highly rated)
export async function getFeaturedProperties(): Promise<PropertyWithImages[]> {
  const properties = await getPublishedProperties();
  // Return promoted first, then limit to 5
  return properties.slice(0, 5);
}

// Get nearby properties (for demo, just return recent)
export async function getNearbyProperties(): Promise<PropertyWithImages[]> {
  const properties = await getPublishedProperties();
  return properties.slice(0, 10);
}
