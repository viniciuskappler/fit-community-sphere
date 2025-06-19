
-- Corrigir função para eliminar warning de segurança
CREATE OR REPLACE FUNCTION public.generate_referral_code(user_id_param UUID, type_param TEXT)
RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  code_prefix TEXT;
  random_suffix TEXT;
  final_code TEXT;
  code_exists BOOLEAN;
BEGIN
  -- Definir prefixo baseado no tipo
  CASE type_param
    WHEN 'establishment' THEN code_prefix := 'EST';
    WHEN 'group' THEN code_prefix := 'GRP';
    WHEN 'supporter' THEN code_prefix := 'SUP';
    ELSE code_prefix := 'REF';
  END CASE;
  
  -- Gerar código até encontrar um único
  LOOP
    random_suffix := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
    final_code := code_prefix || random_suffix;
    
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code = final_code) INTO code_exists;
    
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  -- Inserir o código
  INSERT INTO public.referral_codes (user_id, code, type)
  VALUES (user_id_param, final_code, type_param);
  
  RETURN final_code;
END;
$$;
