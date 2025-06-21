
-- Criar tabela para códigos promocionais
CREATE TABLE IF NOT EXISTS public.promotional_codes (
  code TEXT PRIMARY KEY,
  max_uses INTEGER NOT NULL DEFAULT 300,
  current_uses INTEGER NOT NULL DEFAULT 0,
  discount_percent INTEGER NOT NULL DEFAULT 50,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Criar tabela para lista de espera
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar campos para beta testers e códigos promocionais na tabela user_profiles
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS promo_code TEXT,
ADD COLUMN IF NOT EXISTS is_beta_tester BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS beta_selected_at TIMESTAMP WITH TIME ZONE;

-- Inserir código promocional SQUAD300
INSERT INTO public.promotional_codes (code, max_uses, discount_percent, active) 
VALUES ('SQUAD300', 300, 50, true)
ON CONFLICT (code) DO NOTHING;

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.promotional_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para promotional_codes (público para leitura)
CREATE POLICY "Anyone can view active promotional codes" ON public.promotional_codes
  FOR SELECT USING (active = true);

-- Políticas RLS para waitlist (usuários podem inserir)
CREATE POLICY "Anyone can insert into waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- Função para verificar e aplicar código promocional
CREATE OR REPLACE FUNCTION public.apply_promo_code(promo_code_input TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  promo_record RECORD;
  result JSON;
BEGIN
  -- Buscar código promocional
  SELECT * INTO promo_record 
  FROM public.promotional_codes 
  WHERE code = promo_code_input AND active = true;
  
  -- Verificar se código existe
  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Este código não existe ou está inativo.',
      'error_type', 'invalid_code'
    );
  END IF;
  
  -- Verificar se ainda há vagas
  IF promo_record.current_uses >= promo_record.max_uses THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Vagas esgotadas. Cadastre-se na lista de espera.',
      'error_type', 'limit_exceeded',
      'remaining_slots', 0
    );
  END IF;
  
  -- Incrementar uso do código
  UPDATE public.promotional_codes 
  SET current_uses = current_uses + 1 
  WHERE code = promo_code_input;
  
  -- Retornar sucesso
  RETURN json_build_object(
    'success', true,
    'discount_percent', promo_record.discount_percent,
    'remaining_slots', promo_record.max_uses - promo_record.current_uses - 1
  );
END;
$$;

-- Função para obter estatísticas do código promocional
CREATE OR REPLACE FUNCTION public.get_promo_stats(promo_code_input TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;
