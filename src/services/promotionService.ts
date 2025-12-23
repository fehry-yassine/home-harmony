import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type PromotionPlan = Database['public']['Enums']['promotion_plan'];

export interface Promotion {
  id: string;
  property_id: string;
  plan: PromotionPlan;
  start_date: string;
  end_date: string;
  amount_paid: number;
  is_active: boolean;
  created_at: string;
}

export const PROMOTION_PRICES = {
  week: 29.99,
  month: 99.99,
};

export async function getPropertyPromotions(propertyId: string): Promise<Promotion[]> {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('property_id', propertyId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getActivePromotion(propertyId: string): Promise<Promotion | null> {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('property_id', propertyId)
    .eq('is_active', true)
    .lte('start_date', now)
    .gte('end_date', now)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createPromotion(
  propertyId: string,
  plan: PromotionPlan
): Promise<Promotion> {
  const startDate = new Date();
  const endDate = new Date();
  
  if (plan === 'week') {
    endDate.setDate(endDate.getDate() + 7);
  } else {
    endDate.setMonth(endDate.getMonth() + 1);
  }

  const { data, error } = await supabase
    .from('promotions')
    .insert({
      property_id: propertyId,
      plan,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      amount_paid: PROMOTION_PRICES[plan],
      is_active: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function isPropertyPromoted(propertyId: string): Promise<boolean> {
  const promo = await getActivePromotion(propertyId);
  return !!promo;
}

export async function getHostPromotions(hostId: string): Promise<Promotion[]> {
  // Get all properties for this host
  const { data: properties } = await supabase
    .from('properties')
    .select('id')
    .eq('owner_id', hostId);

  if (!properties || properties.length === 0) return [];

  const propertyIds = properties.map(p => p.id);

  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .in('property_id', propertyIds)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
