import { supabase } from '@/integrations/supabase/client';

export interface HostStats {
  total_listings: number;
  published_listings: number;
  draft_listings: number;
  total_views_7d: number;
  total_views_30d: number;
  total_favorites: number;
}

export async function getHostStats(hostId: string): Promise<HostStats> {
  // Get property counts
  const { data: properties } = await supabase
    .from('properties')
    .select('id, status')
    .eq('owner_id', hostId);

  const total_listings = properties?.length || 0;
  const published_listings = properties?.filter(p => p.status === 'published').length || 0;
  const draft_listings = properties?.filter(p => p.status === 'draft').length || 0;

  const propertyIds = properties?.map(p => p.id) || [];

  // Get views in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count: views7d } = await supabase
    .from('property_views')
    .select('*', { count: 'exact', head: true })
    .in('property_id', propertyIds)
    .gte('viewed_at', sevenDaysAgo.toISOString());

  // Get views in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { count: views30d } = await supabase
    .from('property_views')
    .select('*', { count: 'exact', head: true })
    .in('property_id', propertyIds)
    .gte('viewed_at', thirtyDaysAgo.toISOString());

  // Get favorites count
  const { count: favorites } = await supabase
    .from('favorites')
    .select('*', { count: 'exact', head: true })
    .in('property_id', propertyIds);

  return {
    total_listings,
    published_listings,
    draft_listings,
    total_views_7d: views7d || 0,
    total_views_30d: views30d || 0,
    total_favorites: favorites || 0,
  };
}

// Upload property image - securely gets userId from auth session
export async function uploadPropertyImage(file: File): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('property-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('property-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// Upload avatar - securely gets userId from auth session
export async function uploadAvatar(file: File): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/avatar.${fileExt}`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
