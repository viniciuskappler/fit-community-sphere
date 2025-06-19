
-- Criar tabela para tracking de referrals
CREATE TABLE public.referral_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('establishment', 'group', 'supporter')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Criar tabela para tracking de conversões
CREATE TABLE public.referral_conversions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code_id UUID NOT NULL REFERENCES public.referral_codes(id) ON DELETE CASCADE,
  referred_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversion_type TEXT NOT NULL CHECK (conversion_type IN ('establishment', 'group', 'supporter')),
  commission_amount DECIMAL(10,2) DEFAULT 0,
  commission_status TEXT DEFAULT 'pending' CHECK (commission_status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar RLS
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_conversions ENABLE ROW LEVEL SECURITY;

-- Políticas para referral_codes
CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own referral codes" ON public.referral_codes
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para referral_conversions
CREATE POLICY "Users can view conversions from their referral codes" ON public.referral_conversions
  FOR SELECT USING (
    referral_code_id IN (
      SELECT id FROM public.referral_codes WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "System can create conversions" ON public.referral_conversions
  FOR INSERT WITH CHECK (true);

-- Criar índices para performance
CREATE INDEX idx_referral_codes_user_id ON public.referral_codes(user_id);
CREATE INDEX idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX idx_referral_conversions_referral_code_id ON public.referral_conversions(referral_code_id);
CREATE INDEX idx_referral_conversions_referred_user_id ON public.referral_conversions(referred_user_id);

-- Função para gerar código de referral único
CREATE OR REPLACE FUNCTION public.generate_referral_code(user_id_param UUID, type_param TEXT)
RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;
