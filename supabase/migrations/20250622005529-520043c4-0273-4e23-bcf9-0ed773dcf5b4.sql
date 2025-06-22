
-- Criar tabela para horários de funcionamento dos estabelecimentos
CREATE TABLE public.establishment_hours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Domingo, 6 = Sábado
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para faixas de preço dos estabelecimentos
CREATE TABLE public.establishment_pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL, -- ex: 'quadra_futsal', 'mensalidade_academia'
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  unit TEXT NOT NULL, -- ex: 'hora', 'mês', 'dia'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para categorias/tags dos estabelecimentos
CREATE TABLE public.establishment_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- ex: 'academia', 'quadra', 'piscina', 'campo'
  subcategory TEXT, -- ex: 'futsal', 'basquete', 'natação'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para facilidades/amenidades
CREATE TABLE public.establishment_amenities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  amenity TEXT NOT NULL, -- ex: 'estacionamento', 'vestiario', 'lanchonete', 'ar_condicionado'
  available BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para estatísticas de uso dos estabelecimentos
CREATE TABLE public.establishment_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  total_views INTEGER DEFAULT 0,
  total_favorites INTEGER DEFAULT 0,
  total_contacts INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para melhor performance
CREATE INDEX idx_establishment_hours_establishment_id ON public.establishment_hours(establishment_id);
CREATE INDEX idx_establishment_pricing_establishment_id ON public.establishment_pricing(establishment_id);
CREATE INDEX idx_establishment_categories_establishment_id ON public.establishment_categories(establishment_id);
CREATE INDEX idx_establishment_categories_category ON public.establishment_categories(category);
CREATE INDEX idx_establishment_amenities_establishment_id ON public.establishment_amenities(establishment_id);
CREATE INDEX idx_establishment_stats_establishment_id ON public.establishment_stats(establishment_id);

-- Criar função para atualizar estatísticas automaticamente
CREATE OR REPLACE FUNCTION update_establishment_stats(est_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Criar trigger para atualizar estatísticas quando reviews são criadas/atualizadas
CREATE OR REPLACE FUNCTION trigger_update_establishment_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
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
$$;

CREATE TRIGGER reviews_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_establishment_stats();

CREATE TRIGGER favorites_stats_trigger
  AFTER INSERT OR DELETE ON public.user_favorites
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_establishment_stats();
