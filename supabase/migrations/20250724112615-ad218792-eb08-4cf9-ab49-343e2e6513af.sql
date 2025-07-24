-- PHASE 1: Critical Database Security Fixes (Fixed)

-- Create missing security audit tables
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address INET,
  success BOOLEAN NOT NULL DEFAULT false,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS public.registration_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address INET,
  success BOOLEAN NOT NULL DEFAULT false,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_token TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit tables
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registration_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audit tables (admin-only access)
CREATE POLICY "Only admins can view login attempts" ON public.login_attempts
  FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can view registration attempts" ON public.registration_attempts
  FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Users can view own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage all sessions" ON public.user_sessions
  FOR ALL USING (is_admin(auth.uid()));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_login_attempts_email_time ON public.login_attempts(email, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time ON public.login_attempts(ip_address, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_registration_attempts_email_time ON public.registration_attempts(email, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_registration_attempts_ip_time ON public.registration_attempts(ip_address, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_activity ON public.user_sessions(user_id, last_activity DESC);

-- CRITICAL FIX: Prevent users from updating their own role (papel)
-- Drop existing update policy and create a restricted one
DROP POLICY IF EXISTS "Users can update own data" ON public.usuarios;

-- Create security definer function to check if role is being changed
CREATE OR REPLACE FUNCTION public.prevent_role_escalation(user_id uuid, new_papel text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = user_id AND papel = new_papel
  );
$$;

-- Create new restricted update policy that prevents papel changes
CREATE POLICY "Users can update own data except role" ON public.usuarios
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    prevent_role_escalation(auth.uid(), papel)
  );

-- Admin policy for updating all user data including roles
CREATE POLICY "Admins can update all user data including roles" ON public.usuarios
  FOR UPDATE 
  USING (is_admin(auth.uid()));

-- Update all database functions with secure search_path
CREATE OR REPLACE FUNCTION public.cleanup_user_sessions(user_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  DELETE FROM public.user_sessions
  WHERE user_id = user_id_param 
    AND last_activity < now() - interval '7 days';
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = user_id AND papel = 'admin'
  );
$function$;

CREATE OR REPLACE FUNCTION public.check_login_attempts(user_email text, user_ip inet DEFAULT NULL::inet)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  attempt_count INTEGER := 0;
  ip_attempt_count INTEGER := 0;
  last_attempt TIMESTAMP WITH TIME ZONE;
  is_locked BOOLEAN := false;
BEGIN
  SELECT COUNT(*), MAX(attempted_at)
  INTO attempt_count, last_attempt
  FROM public.login_attempts
  WHERE email = user_email
    AND attempted_at > now() - interval '15 minutes'
    AND success = false;
  
  IF user_ip IS NOT NULL THEN
    SELECT COUNT(*)
    INTO ip_attempt_count
    FROM public.login_attempts
    WHERE ip_address = user_ip
      AND attempted_at > now() - interval '15 minutes'
      AND success = false;
  END IF;
  
  IF attempt_count >= 5 OR ip_attempt_count >= 10 THEN
    is_locked := true;
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
$function$;

CREATE OR REPLACE FUNCTION public.check_registration_rate_limit(user_email text, user_ip inet DEFAULT NULL::inet)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  email_attempts INTEGER := 0;
  ip_attempts INTEGER := 0;
  is_rate_limited BOOLEAN := false;
BEGIN
  SELECT COUNT(*)
  INTO email_attempts
  FROM public.registration_attempts
  WHERE email = user_email
    AND attempted_at > now() - interval '1 hour';
  
  IF user_ip IS NOT NULL THEN
    SELECT COUNT(*)
    INTO ip_attempts
    FROM public.registration_attempts
    WHERE ip_address = user_ip
      AND attempted_at > now() - interval '1 hour';
  END IF;
  
  IF email_attempts >= 3 OR ip_attempts >= 5 THEN
    is_rate_limited := true;
  END IF;
  
  RETURN json_build_object(
    'is_rate_limited', is_rate_limited,
    'email_attempts', email_attempts,
    'ip_attempts', ip_attempts
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'is_rate_limited', false,
      'email_attempts', 0,
      'ip_attempts', 0,
      'error', SQLERRM
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_registration_attempt(user_email text, was_successful boolean, user_ip inet DEFAULT NULL::inet)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.registration_attempts (email, ip_address, success)
  VALUES (user_email, user_ip, was_successful);
  
  DELETE FROM public.registration_attempts
  WHERE attempted_at < now() - interval '24 hours';
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_login_attempt(user_email text, was_successful boolean, user_ip inet DEFAULT NULL::inet)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.login_attempts (email, ip_address, success)
  VALUES (user_email, user_ip, was_successful);
  
  DELETE FROM public.login_attempts
  WHERE attempted_at < now() - interval '1 hour';
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  DELETE FROM public.user_sessions
  WHERE last_activity < now() - interval '24 hours';
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
declare
  metadata jsonb;
begin
  metadata := new.raw_user_meta_data;

  insert into public.usuarios (
    id,
    nome,
    cpf,
    telefone,
    email,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    data_nascimento,
    esportes_favoritos,
    esportes_praticados,
    esportes_interesse,
    squad_code,
    criado_em
  )
  values (
    new.id,
    metadata->>'full_name',
    metadata->>'cpf',
    metadata->>'phone',
    new.email,
    metadata->>'cep',
    metadata->>'street',
    metadata->>'number',
    metadata->>'neighborhood',
    metadata->>'city',
    metadata->>'state',
    to_date(metadata->>'birth_date', 'YYYY-MM-DD'),
    string_to_array(coalesce(metadata->>'sports_favorites', ''), ','),
    string_to_array(coalesce(metadata->>'sports_practiced', ''), ','),
    string_to_array(coalesce(metadata->>'sports_interest', ''), ','),
    coalesce(metadata->>'promo_code', 'SQUAD300'),
    now()
  );

  return new;
end;
$function$;