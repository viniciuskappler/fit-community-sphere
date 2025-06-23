
-- Corrigir warnings do Supabase

-- 1. Adicionar políticas RLS ausentes para establishment_pricing
CREATE POLICY "Establishment owners can manage pricing" ON public.establishment_pricing
  FOR ALL USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view establishment pricing" ON public.establishment_pricing
  FOR SELECT USING (true);

-- 2. Habilitar RLS para tabelas que ainda não têm
ALTER TABLE public.establishment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_stats ENABLE ROW LEVEL SECURITY;

-- 3. Corrigir constraint única ausente na tabela establishment_stats
ALTER TABLE public.establishment_stats 
ADD CONSTRAINT unique_establishment_stats UNIQUE (establishment_id);

-- 4. Adicionar índice ausente para performance
CREATE INDEX IF NOT EXISTS idx_establishment_pricing_establishment_id 
ON public.establishment_pricing(establishment_id);

-- 5. Corrigir função handle_new_user para não ter warnings de segurança
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

-- 6. Adicionar constraint de validação para ratings
ALTER TABLE public.reviews 
ADD CONSTRAINT valid_rating_range 
CHECK (rating >= 1 AND rating <= 5);

-- 7. Corrigir políticas de user_profiles para ter constraint NOT NULL adequado
ALTER TABLE public.user_profiles 
ALTER COLUMN id SET NOT NULL;

-- Atualizar trigger que pode estar causando warning
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
