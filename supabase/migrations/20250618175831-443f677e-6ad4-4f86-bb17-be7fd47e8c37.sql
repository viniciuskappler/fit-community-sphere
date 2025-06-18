
-- Criar tabela para reviews/avaliações
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  establishment_id UUID REFERENCES public.establishments(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.sports_groups(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT review_target_check CHECK (
    (establishment_id IS NOT NULL AND group_id IS NULL) OR 
    (establishment_id IS NULL AND group_id IS NOT NULL)
  )
);

-- Criar tabela para fotos dos estabelecimentos
CREATE TABLE public.establishment_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para fotos dos grupos
CREATE TABLE public.group_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.sports_groups(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption TEXT,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para favoritos
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  establishment_id UUID REFERENCES public.establishments(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.sports_groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT favorite_target_check CHECK (
    (establishment_id IS NOT NULL AND group_id IS NULL) OR 
    (establishment_id IS NULL AND group_id IS NOT NULL)
  ),
  CONSTRAINT unique_user_favorite UNIQUE (user_id, establishment_id, group_id)
);

-- Adicionar coordenadas geográficas aos estabelecimentos
ALTER TABLE public.establishments 
ADD COLUMN latitude DECIMAL(10, 8),
ADD COLUMN longitude DECIMAL(11, 8);

-- Adicionar coordenadas geográficas aos grupos (ponto de encontro principal)
ALTER TABLE public.sports_groups 
ADD COLUMN latitude DECIMAL(10, 8),
ADD COLUMN longitude DECIMAL(11, 8),
ADD COLUMN meeting_point TEXT;

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para reviews (qualquer usuário pode ver, apenas criador pode editar/deletar)
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Políticas para fotos (qualquer usuário pode ver, apenas donos podem gerenciar)
CREATE POLICY "Anyone can view establishment photos" ON public.establishment_photos FOR SELECT USING (true);
CREATE POLICY "Establishment owners can manage photos" ON public.establishment_photos 
  FOR ALL USING (
    establishment_id IN (
      SELECT id FROM public.establishments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view group photos" ON public.group_photos FOR SELECT USING (true);
CREATE POLICY "Group owners can manage photos" ON public.group_photos 
  FOR ALL USING (
    group_id IN (
      SELECT id FROM public.sports_groups WHERE user_id = auth.uid()
    )
  );

-- Políticas para favoritos (apenas o próprio usuário pode ver/gerenciar)
CREATE POLICY "Users can view their own favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites FOR ALL USING (auth.uid() = user_id);

-- Criar índices para melhor performance
CREATE INDEX idx_reviews_establishment_id ON public.reviews(establishment_id);
CREATE INDEX idx_reviews_group_id ON public.reviews(group_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_establishment_photos_establishment_id ON public.establishment_photos(establishment_id);
CREATE INDEX idx_group_photos_group_id ON public.group_photos(group_id);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);
CREATE INDEX idx_establishments_location ON public.establishments(latitude, longitude);
CREATE INDEX idx_sports_groups_location ON public.sports_groups(latitude, longitude);
