-- Fix: Add authorization check to get_admin_stats() RPC
-- Only admins should be able to access sensitive business metrics

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
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Authorization check: Only admins can access stats
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM public.profiles)::BIGINT,
    (SELECT COUNT(*) FROM public.user_roles WHERE role = 'renter')::BIGINT,
    (SELECT COUNT(*) FROM public.user_roles WHERE role = 'host')::BIGINT,
    (SELECT COUNT(*) FROM public.properties)::BIGINT,
    (SELECT COUNT(*) FROM public.properties WHERE status = 'published')::BIGINT,
    (SELECT COUNT(*) FROM public.favorites)::BIGINT,
    (SELECT COUNT(*) FROM public.property_views)::BIGINT,
    (SELECT COALESCE(SUM(amount_paid), 0) FROM public.promotions)::NUMERIC;
END;
$$;