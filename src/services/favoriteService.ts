import { supabase } from '@/integrations/supabase/client';
import { PropertyWithImages, getProperty } from './propertyService';

export interface Favorite {
  id: string;
  property_id: string;
  user_id: string;
  created_at: string;
}

// Get user's favorites
export async function getUserFavorites(userId: string): Promise<PropertyWithImages[]> {
  const { data: favorites, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId);

  if (error) throw error;
  if (!favorites || favorites.length === 0) return [];

  const propertyIds = favorites.map(f => f.property_id);
  
  const { data: properties } = await supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .in('id', propertyIds);

  return (properties || []).map(p => ({
    ...p,
    images: p.images || [],
  }));
}

// Get user's favorite property IDs
export async function getFavoriteIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId);

  if (error) throw error;
  return (data || []).map(f => f.property_id);
}

// Check if property is favorited
export async function isFavorite(userId: string, propertyId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('property_id', propertyId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

// Add to favorites
export async function addFavorite(userId: string, propertyId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, property_id: propertyId });

  if (error && error.code !== '23505') throw error; // Ignore duplicate key errors
}

// Remove from favorites
export async function removeFavorite(userId: string, propertyId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('property_id', propertyId);

  if (error) throw error;
}

// Toggle favorite
export async function toggleFavorite(userId: string, propertyId: string): Promise<boolean> {
  const favorited = await isFavorite(userId, propertyId);
  
  if (favorited) {
    await removeFavorite(userId, propertyId);
    return false;
  } else {
    await addFavorite(userId, propertyId);
    return true;
  }
}
