-- Fix: Remove the overly permissive authenticated users policy
-- Keep only owner-based access for full profile data

DROP POLICY IF EXISTS "Authenticated users can view public profile info" ON public.profiles;