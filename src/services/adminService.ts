import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  total_users: number;
  total_renters: number;
  total_hosts: number;
  total_properties: number;
  published_properties: number;
  total_favorites: number;
  total_views: number;
  total_revenue: number;
}

export interface ViewsOverTime {
  date: string;
  count: number;
}

export interface PropertyByCity {
  city: string;
  count: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const { data, error } = await supabase.rpc('get_admin_stats');
  
  if (error) throw error;
  
  if (data && data.length > 0) {
    const row = data[0];
    return {
      total_users: Number(row.total_users) || 0,
      total_renters: Number(row.total_renters) || 0,
      total_hosts: Number(row.total_hosts) || 0,
      total_properties: Number(row.total_properties) || 0,
      published_properties: Number(row.published_properties) || 0,
      total_favorites: Number(row.total_favorites) || 0,
      total_views: Number(row.total_views) || 0,
      total_revenue: Number(row.total_revenue) || 0,
    };
  }

  return {
    total_users: 0,
    total_renters: 0,
    total_hosts: 0,
    total_properties: 0,
    published_properties: 0,
    total_favorites: 0,
    total_views: 0,
    total_revenue: 0,
  };
}

export async function getViewsOverTime(days: number = 30): Promise<ViewsOverTime[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('property_views')
    .select('viewed_at')
    .gte('viewed_at', startDate.toISOString());

  if (error) throw error;

  // Group by date
  const grouped: Record<string, number> = {};
  
  (data || []).forEach(view => {
    const date = new Date(view.viewed_at).toISOString().split('T')[0];
    grouped[date] = (grouped[date] || 0) + 1;
  });

  // Fill in missing dates
  const result: ViewsOverTime[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      count: grouped[dateStr] || 0,
    });
  }

  return result;
}

export async function getPropertiesByCity(): Promise<PropertyByCity[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('city');

  if (error) throw error;

  const grouped: Record<string, number> = {};
  (data || []).forEach(p => {
    grouped[p.city] = (grouped[p.city] || 0) + 1;
  });

  return Object.entries(grouped)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, user_roles(role)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAllProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*, images:property_images(*), owner:profiles(name, email)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
