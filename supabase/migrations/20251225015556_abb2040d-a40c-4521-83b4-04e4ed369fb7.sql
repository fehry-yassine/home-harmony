-- Fix 1: Restrict user_roles INSERT to admins only (prevent self-role-elevation)
-- The trigger handle_new_user() already assigns the default 'renter' role
-- Only admins should be able to add additional roles

-- Drop any existing INSERT policies that might allow self-assignment
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;

-- Create restrictive INSERT policy - only admins can add roles
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Ensure profiles table only allows users to view their own profile
-- and create a secure function for public profile lookups

-- Drop any permissive SELECT policies
DROP POLICY IF EXISTS "Authenticated users can view public profile info" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;

-- The existing "Users can view own full profile" policy is correct
-- Ensure it exists (re-create if needed)
DROP POLICY IF EXISTS "Users can view own full profile" ON public.profiles;

CREATE POLICY "Users can view own full profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- The get_public_profile function already exists and is secure
-- It only returns id, name, avatar_url (no email)
-- Verify it's correctly defined by recreating it
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (id uuid, name text, avatar_url text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.name, p.avatar_url
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;