
-- Habilitar RLS nas tabelas que ainda não têm
ALTER TABLE public.estabelecimentos_esportivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grupos_esportivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profissionais_esportivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos_esportivos ENABLE ROW LEVEL SECURITY;

-- Políticas para estabelecimentos_esportivos
CREATE POLICY "Todos podem visualizar estabelecimentos" 
  ON public.estabelecimentos_esportivos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Usuários podem criar próprios estabelecimentos" 
  ON public.estabelecimentos_esportivos 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar próprios estabelecimentos" 
  ON public.estabelecimentos_esportivos 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprios estabelecimentos" 
  ON public.estabelecimentos_esportivos 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para grupos_esportivos
CREATE POLICY "Todos podem visualizar grupos" 
  ON public.grupos_esportivos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Usuários podem criar próprios grupos" 
  ON public.grupos_esportivos 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar próprios grupos" 
  ON public.grupos_esportivos 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprios grupos" 
  ON public.grupos_esportivos 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para profissionais_esportivos
CREATE POLICY "Todos podem visualizar profissionais" 
  ON public.profissionais_esportivos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Usuários podem criar próprios perfis profissionais" 
  ON public.profissionais_esportivos 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar próprios perfis profissionais" 
  ON public.profissionais_esportivos 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprios perfis profissionais" 
  ON public.profissionais_esportivos 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para eventos_esportivos
CREATE POLICY "Todos podem visualizar eventos" 
  ON public.eventos_esportivos 
  FOR SELECT 
  USING (true);

CREATE POLICY "Usuários podem criar próprios eventos" 
  ON public.eventos_esportivos 
  FOR INSERT 
  WITH CHECK (auth.uid() = organizador_id);

CREATE POLICY "Usuários podem editar próprios eventos" 
  ON public.eventos_esportivos 
  FOR UPDATE 
  USING (auth.uid() = organizador_id);

CREATE POLICY "Usuários podem deletar próprios eventos" 
  ON public.eventos_esportivos 
  FOR DELETE 
  USING (auth.uid() = organizador_id);

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_estabelecimentos_user_id ON public.estabelecimentos_esportivos(user_id);
CREATE INDEX IF NOT EXISTS idx_grupos_user_id ON public.grupos_esportivos(user_id);
CREATE INDEX IF NOT EXISTS idx_profissionais_user_id ON public.profissionais_esportivos(user_id);
CREATE INDEX IF NOT EXISTS idx_eventos_organizador_id ON public.eventos_esportivos(organizador_id);

-- Índices para busca geográfica
CREATE INDEX IF NOT EXISTS idx_estabelecimentos_location ON public.estabelecimentos_esportivos(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_grupos_location ON public.grupos_esportivos(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_eventos_location ON public.eventos_esportivos(latitude, longitude);
