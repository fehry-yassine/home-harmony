-- Fix: Promotion creation should require admin role (payment bypass vulnerability)
-- Remove the host-based promotion creation policy and replace with admin-only

DROP POLICY IF EXISTS "Hosts can create promotions for own properties" ON public.promotions;

-- Only admins can create promotions (after verifying payment externally)
CREATE POLICY "Only admins can create promotions"
  ON public.promotions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));