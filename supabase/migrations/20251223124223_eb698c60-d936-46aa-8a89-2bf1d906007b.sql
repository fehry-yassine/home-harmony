-- Fix security definer view by dropping it and creating a function instead
DROP VIEW IF EXISTS public.admin_stats;

-- Create a security definer function for admin stats instead
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS TABLE (
  total_users BIGINT,
  total_renters BIGINT,
  total_hosts BIGINT,
  total_properties BIGINT,
  published_properties BIGINT,
  total_favorites BIGINT,
  total_views BIGINT,
  total_revenue NUMERIC
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT COUNT(*) FROM public.profiles),
    (SELECT COUNT(*) FROM public.user_roles WHERE role = 'renter'),
    (SELECT COUNT(*) FROM public.user_roles WHERE role = 'host'),
    (SELECT COUNT(*) FROM public.properties),
    (SELECT COUNT(*) FROM public.properties WHERE status = 'published'),
    (SELECT COUNT(*) FROM public.favorites),
    (SELECT COUNT(*) FROM public.property_views),
    (SELECT COALESCE(SUM(amount_paid), 0) FROM public.promotions)
$$;