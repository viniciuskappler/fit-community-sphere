-- PHASE 1: Critical Database Security Fixes

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
CREATE INDEX idx_login_attempts_email_time ON public.login_attempts(email, attempted_at DESC);
CREATE INDEX idx_login_attempts_ip_time ON public.login_attempts(ip_address, attempted_at DESC);
CREATE INDEX idx_registration_attempts_email_time ON public.registration_attempts(email, attempted_at DESC);
CREATE INDEX idx_registration_attempts_ip_time ON public.registration_attempts(ip_address, attempted_at DESC);
CREATE INDEX idx_user_sessions_user_activity ON public.user_sessions(user_id, last_activity DESC);

-- CRITICAL FIX: Prevent users from updating their own role (papel)
-- Drop existing update policy and create a restricted one
DROP POLICY IF EXISTS "Users can update own data" ON public.usuarios;

-- Create new restricted update policy that excludes papel field
CREATE POLICY "Users can update own data except role" ON public.usuarios
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    -- Prevent papel changes by ensuring it stays the same
    OLD.papel = NEW.papel
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

CREATE OR REPLACE FUNCTION public.generate_referral_code(user_id_param uuid, type_param text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  code_prefix TEXT;
  random_suffix TEXT;
  final_code TEXT;
  code_exists BOOLEAN;
BEGIN
  CASE type_param
    WHEN 'establishment' THEN code_prefix := 'EST';
    WHEN 'group' THEN code_prefix := 'GRP';
    WHEN 'supporter' THEN code_prefix := 'SUP';
    ELSE code_prefix := 'REF';
  END CASE;
  
  LOOP
    random_suffix := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
    final_code := code_prefix || random_suffix;
    
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code = final_code) INTO code_exists;
    
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  INSERT INTO public.referral_codes (user_id, code, type)
  VALUES (user_id_param, final_code, type_param);
  
  RETURN final_code;
END;
$function$;

CREATE OR REPLACE FUNCTION public.apply_promo_code(promo_code_input text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  promo_record RECORD;
BEGIN
  SELECT * INTO promo_record 
  FROM public.promotional_codes 
  WHERE code = promo_code_input AND active = true;
  
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Este código não existe ou está inativo.',
      'error_type', 'invalid_code'
    );
  END IF;
  
  IF promo_record.current_uses >= promo_record.max_uses THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Vagas esgotadas. Cadastre-se na lista de espera.',
      'error_type', 'limit_exceeded',
      'remaining_slots', 0
    );
  END IF;
  
  UPDATE public.promotional_codes 
  SET current_uses = current_uses + 1 
  WHERE code = promo_code_input;
  
  RETURN json_build_object(
    'success', true,
    'discount_percent', promo_record.discount_percent,
    'remaining_slots', promo_record.max_uses - promo_record.current_uses - 1
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_promo_stats(promo_code_input text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  promo_record RECORD;
BEGIN
  SELECT * INTO promo_record 
  FROM public.promotional_codes 
  WHERE code = promo_code_input AND active = true;
  
  IF NOT FOUND THEN
    RETURN json_build_object('error', 'Código não encontrado');
  END IF;
  
  RETURN json_build_object(
    'current_uses', promo_record.current_uses,
    'max_uses', promo_record.max_uses,
    'remaining_slots', promo_record.max_uses - promo_record.current_uses,
    'discount_percent', promo_record.discount_percent,
    'active', promo_record.active
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

CREATE OR REPLACE FUNCTION public.update_establishment_stats(est_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.establishment_stats (establishment_id, total_favorites, average_rating)
  VALUES (
    est_id,
    (SELECT COUNT(*) FROM public.user_favorites WHERE establishment_id = est_id),
    (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE establishment_id = est_id)
  )
  ON CONFLICT (establishment_id) 
  DO UPDATE SET
    total_favorites = (SELECT COUNT(*) FROM public.user_favorites WHERE establishment_id = est_id),
    average_rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE establishment_id = est_id),
    last_updated = now();
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