-- Fix remaining database functions missing search_path

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

CREATE OR REPLACE FUNCTION public.delete_all_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
declare
  r record;
begin
  for r in select id from auth.users
  loop
    delete from auth.users where id = r.id;
  end loop;
end;
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

CREATE OR REPLACE FUNCTION public.trigger_update_establishment_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    PERFORM update_establishment_stats(NEW.establishment_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM update_establishment_stats(OLD.establishment_id);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;