
-- Phase 1: Critical Authentication Fixes (Fixed Version)

-- 1. Fix user_profiles RLS policies - remove conflicting policies
DROP POLICY IF EXISTS "Users can view their own profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow profile creation via trigger" ON public.user_profiles;

-- Create clean, non-conflicting RLS policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "System can create profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (true);

-- 2. Fix establishment_pricing duplicate policies
DROP POLICY IF EXISTS "Establishment owners can manage pricing" ON public.establishment_pricing;
DROP POLICY IF EXISTS "Public can view establishment pricing" ON public.establishment_pricing;

-- Create single set of policies for establishment_pricing
CREATE POLICY "Owners manage establishment pricing" ON public.establishment_pricing
  FOR ALL USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public read establishment pricing" ON public.establishment_pricing
  FOR SELECT USING (true);

-- 3. Enhanced handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert with comprehensive metadata extraction
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'fullName', 
      NEW.raw_user_meta_data->>'name',
      split_part(COALESCE(NEW.email, ''), '@', 1)
    )
  );
  
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, update it instead
    UPDATE public.user_profiles 
    SET full_name = COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'fullName',
      NEW.raw_user_meta_data->>'name',
      full_name
    )
    WHERE id = NEW.id;
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't block user creation
    RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- 4. Add session security function
CREATE OR REPLACE FUNCTION public.cleanup_user_sessions(user_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Remove old sessions for security
  DELETE FROM public.user_sessions
  WHERE user_id = user_id_param 
    AND last_activity < now() - interval '7 days';
END;
$$;

-- 5. Enhanced login attempt checking with IP tracking
CREATE OR REPLACE FUNCTION public.check_login_attempts(user_email text, user_ip inet DEFAULT NULL::inet)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  attempt_count INTEGER;
  ip_attempt_count INTEGER;
  last_attempt TIMESTAMP WITH TIME ZONE;
  is_locked BOOLEAN DEFAULT false;
BEGIN
  -- Count failed attempts by email in last 15 minutes
  SELECT COUNT(*), MAX(attempted_at)
  INTO attempt_count, last_attempt
  FROM public.login_attempts
  WHERE email = user_email
    AND attempted_at > now() - interval '15 minutes'
    AND success = false;
  
  -- Count failed attempts by IP in last 15 minutes (if IP provided)
  IF user_ip IS NOT NULL THEN
    SELECT COUNT(*)
    INTO ip_attempt_count
    FROM public.login_attempts
    WHERE ip_address = user_ip
      AND attempted_at > now() - interval '15 minutes'
      AND success = false;
  ELSE
    ip_attempt_count := 0;
  END IF;
  
  -- Lock account if too many attempts by email OR IP
  IF attempt_count >= 5 OR ip_attempt_count >= 10 THEN
    is_locked = true;
  END IF;
  
  RETURN json_build_object(
    'is_locked', is_locked,
    'attempt_count', COALESCE(attempt_count, 0),
    'ip_attempt_count', COALESCE(ip_attempt_count, 0),
    'last_attempt', last_attempt
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'is_locked', false,
      'attempt_count', 0,
      'ip_attempt_count', 0,
      'last_attempt', null,
      'error', SQLERRM
    );
END;
$$;

-- 6. Add rate limiting for registration
CREATE TABLE IF NOT EXISTS public.registration_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address INET,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  success BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.registration_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for registration attempts (system only)
CREATE POLICY "System manages registration attempts" ON public.registration_attempts
  FOR ALL USING (false);

-- Function to check registration rate limiting
CREATE OR REPLACE FUNCTION public.check_registration_rate_limit(user_email text, user_ip inet DEFAULT NULL::inet)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  email_attempts INTEGER;
  ip_attempts INTEGER;
  is_rate_limited BOOLEAN DEFAULT false;
BEGIN
  -- Count registration attempts by email in last hour
  SELECT COUNT(*)
  INTO email_attempts
  FROM public.registration_attempts
  WHERE email = user_email
    AND attempted_at > now() - interval '1 hour';
  
  -- Count registration attempts by IP in last hour
  IF user_ip IS NOT NULL THEN
    SELECT COUNT(*)
    INTO ip_attempts
    FROM public.registration_attempts
    WHERE ip_address = user_ip
      AND attempted_at > now() - interval '1 hour';
  ELSE
    ip_attempts := 0;
  END IF;
  
  -- Rate limit if too many attempts
  IF email_attempts >= 3 OR ip_attempts >= 5 THEN
    is_rate_limited = true;
  END IF;
  
  RETURN json_build_object(
    'is_rate_limited', is_rate_limited,
    'email_attempts', email_attempts,
    'ip_attempts', ip_attempts
  );
END;
$$;

-- Function to log registration attempts
CREATE OR REPLACE FUNCTION public.log_registration_attempt(user_email text, was_successful boolean, user_ip inet DEFAULT NULL::inet)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.registration_attempts (email, ip_address, success)
  VALUES (user_email, user_ip, was_successful);
  
  -- Clean up old attempts
  DELETE FROM public.registration_attempts
  WHERE attempted_at < now() - interval '24 hours';
END;
$$;

-- 7. Add indexes for performance and security (Fixed - removed IMMUTABLE predicate issue)
CREATE INDEX IF NOT EXISTS idx_login_attempts_email 
  ON public.login_attempts(email, attempted_at);

CREATE INDEX IF NOT EXISTS idx_login_attempts_ip 
  ON public.login_attempts(ip_address, attempted_at);

CREATE INDEX IF NOT EXISTS idx_registration_attempts_email 
  ON public.registration_attempts(email, attempted_at);

CREATE INDEX IF NOT EXISTS idx_registration_attempts_ip 
  ON public.registration_attempts(ip_address, attempted_at);
