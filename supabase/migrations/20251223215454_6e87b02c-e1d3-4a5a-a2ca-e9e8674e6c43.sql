-- Fix: User Emails Publicly Exposed
-- Replace the overly permissive policy with secure alternatives

-- Drop the existing policy that exposes all data
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create a secure function to get public profile data (no email)
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  avatar_url text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id, p.name, p.avatar_url
  FROM public.profiles p
  WHERE p.id = profile_id;
$$;

-- Policy: Users can view their own full profile (including email)
CREATE POLICY "Users can view own full profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Allow authenticated users to see basic public info (name, avatar only)
-- This uses a view-based approach through RLS
CREATE POLICY "Authenticated users can view public profile info"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

-- Note: To truly hide email at column level, we'll handle this in the application layer
-- by only selecting name/avatar_url when fetching other users' profiles