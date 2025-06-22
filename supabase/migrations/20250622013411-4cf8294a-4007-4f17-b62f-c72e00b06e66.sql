
-- Phase 1: Critical RLS Policy Fixes

-- Add missing RLS policies for establishment_categories
CREATE POLICY "Establishment owners can manage categories" ON public.establishment_categories
  FOR ALL USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view establishment categories" ON public.establishment_categories
  FOR SELECT USING (true);

-- Add missing RLS policies for establishment_amenities  
CREATE POLICY "Establishment owners can manage amenities" ON public.establishment_amenities
  FOR ALL USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view establishment amenities" ON public.establishment_amenities
  FOR SELECT USING (true);

-- Add missing RLS policies for establishment_hours
CREATE POLICY "Establishment owners can manage hours" ON public.establishment_hours
  FOR ALL USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view establishment hours" ON public.establishment_hours
  FOR SELECT USING (true);

-- Add missing RLS policies for establishment_stats
CREATE POLICY "Public can view establishment stats" ON public.establishment_stats
  FOR SELECT USING (true);

CREATE POLICY "System can update establishment stats" ON public.establishment_stats
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can modify establishment stats" ON public.establishment_stats
  FOR UPDATE USING (true);

-- Fix user_profiles policies - make user_id NOT NULL where needed
ALTER TABLE public.user_profiles ALTER COLUMN id SET NOT NULL;

-- Ensure reviews table has proper constraints
ALTER TABLE public.reviews ALTER COLUMN user_id SET NOT NULL;

-- Add rate limiting table for login attempts
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address INET,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  success BOOLEAN NOT NULL DEFAULT false
);

-- Enable RLS on login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for login attempts (admin only)
CREATE POLICY "Admins can view login attempts" ON public.login_attempts
  FOR SELECT USING (false); -- Restrict access for now

-- Create function to check login attempts
CREATE OR REPLACE FUNCTION public.check_login_attempts(user_email TEXT, user_ip INET DEFAULT NULL)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  attempt_count INTEGER;
  last_attempt TIMESTAMP WITH TIME ZONE;
  is_locked BOOLEAN DEFAULT false;
BEGIN
  -- Count failed attempts in last 15 minutes
  SELECT COUNT(*), MAX(attempted_at)
  INTO attempt_count, last_attempt
  FROM public.login_attempts
  WHERE email = user_email
    AND attempted_at > now() - interval '15 minutes'
    AND success = false;
  
  -- Lock account if more than 5 failed attempts
  IF attempt_count >= 5 THEN
    is_locked = true;
  END IF;
  
  RETURN json_build_object(
    'is_locked', is_locked,
    'attempt_count', attempt_count,
    'last_attempt', last_attempt
  );
END;
$$;

-- Create function to log login attempts
CREATE OR REPLACE FUNCTION public.log_login_attempt(user_email TEXT, was_successful BOOLEAN, user_ip INET DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.login_attempts (email, ip_address, success)
  VALUES (user_email, user_ip, was_successful);
  
  -- Clean up old attempts (older than 1 hour)
  DELETE FROM public.login_attempts
  WHERE attempted_at < now() - interval '1 hour';
END;
$$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time ON public.login_attempts(email, attempted_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_cleanup ON public.login_attempts(attempted_at);

-- Create session management table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  last_activity TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address INET,
  user_agent TEXT
);

-- Enable RLS on user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for user sessions
CREATE POLICY "Users can view their own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own sessions" ON public.user_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.user_sessions
  WHERE last_activity < now() - interval '24 hours';
END;
$$;
