
-- Criar tabela de perfis de usuários
CREATE TABLE public.user_profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  cpf TEXT,
  phone TEXT,
  city TEXT,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Criar tabela de esportes dos usuários
CREATE TABLE public.user_sports (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sport_name TEXT NOT NULL,
  sport_type TEXT NOT NULL CHECK (sport_type IN ('favorite', 'practiced', 'interested')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(user_id, sport_name, sport_type)
);

-- Criar tabela de estabelecimentos
CREATE TABLE public.establishments (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  establishment_name TEXT NOT NULL,
  corporate_name TEXT NOT NULL,
  cnpj TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  cep TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Criar tabela de grupos esportivos
CREATE TABLE public.sports_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  corporate_name TEXT NOT NULL,
  cities TEXT[] NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Criar tabela de esportes dos estabelecimentos
CREATE TABLE public.establishment_sports (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES public.establishments(id) ON DELETE CASCADE,
  sport_name TEXT NOT NULL,
  sport_type TEXT NOT NULL CHECK (sport_type IN ('main', 'other')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(establishment_id, sport_name, sport_type)
);

-- Criar tabela de esportes dos grupos
CREATE TABLE public.group_sports (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.sports_groups(id) ON DELETE CASCADE,
  sport_name TEXT NOT NULL,
  sport_type TEXT NOT NULL CHECK (sport_type IN ('main', 'other')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(group_id, sport_name, sport_type)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.establishment_sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_sports ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para user_sports
CREATE POLICY "Users can view their own sports" ON public.user_sports
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own sports" ON public.user_sports
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sports" ON public.user_sports
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sports" ON public.user_sports
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para establishments
CREATE POLICY "Users can view their own establishments" ON public.establishments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own establishments" ON public.establishments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own establishments" ON public.establishments
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Public can view all establishments" ON public.establishments
  FOR SELECT USING (true);

-- Políticas RLS para sports_groups
CREATE POLICY "Users can view their own groups" ON public.sports_groups
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own groups" ON public.sports_groups
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own groups" ON public.sports_groups
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Public can view all groups" ON public.sports_groups
  FOR SELECT USING (true);

-- Políticas RLS para establishment_sports
CREATE POLICY "Users can manage establishment sports" ON public.establishment_sports
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.establishments 
    WHERE id = establishment_id AND user_id = auth.uid()
  ));
CREATE POLICY "Public can view establishment sports" ON public.establishment_sports
  FOR SELECT USING (true);

-- Políticas RLS para group_sports
CREATE POLICY "Users can manage group sports" ON public.group_sports
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.sports_groups 
    WHERE id = group_id AND user_id = auth.uid()
  ));
CREATE POLICY "Public can view group sports" ON public.group_sports
  FOR SELECT USING (true);

-- Função para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
