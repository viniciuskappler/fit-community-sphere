-- Verificar configurações de email no Supabase
-- Primeiro, vamos garantir que temos a estrutura correta para assinaturas

-- Criar tabela de planos de assinatura
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('supporter', 'establishment', 'group', 'professional')),
  price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_yearly DECIMAL(10,2) NOT NULL DEFAULT 0,
  features JSONB NOT NULL DEFAULT '[]',
  is_free BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Criar tabela de assinaturas de usuários
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES subscription_plans(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'canceled', 'past_due')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, plan_id)
);

-- Habilitar RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para planos (públicos para leitura)
CREATE POLICY "Anyone can view subscription plans" ON public.subscription_plans
FOR SELECT USING (true);

-- Políticas RLS para assinaturas do usuário
CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON public.user_subscriptions
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.user_subscriptions
FOR UPDATE USING (auth.uid() = user_id);

-- Inserir planos padrão
INSERT INTO public.subscription_plans (name, type, price_monthly, price_yearly, features, is_free) VALUES
('Praticante Gratuito', 'supporter', 0, 0, '["Buscar estabelecimentos", "Buscar grupos", "Perfil básico"]', true),
('Praticante Premium', 'supporter', 29.90, 299.90, '["Buscar estabelecimentos", "Buscar grupos", "Perfil completo", "Favoritos ilimitados", "Notificações prioritárias", "Suporte premium"]', false),
('Estabelecimento Gratuito', 'establishment', 0, 0, '["Cadastro básico", "3 fotos", "Horários básicos"]', true),
('Estabelecimento Premium', 'establishment', 99.90, 999.90, '["Cadastro completo", "Fotos ilimitadas", "Gestão de horários", "Analytics", "Destaque nos resultados", "Suporte premium"]', false),
('Grupo Gratuito', 'group', 0, 0, '["Cadastro básico", "3 fotos", "Localização básica"]', true),
('Grupo Premium', 'group', 59.90, 599.90, '["Cadastro completo", "Fotos ilimitadas", "Múltiplas localizações", "Gestão de membros", "Eventos", "Suporte premium"]', false),
('Profissional Gratuito', 'professional', 0, 0, '["Perfil básico", "Contato limitado", "3 fotos"]', true),
('Profissional Premium', 'professional', 79.90, 799.90, '["Perfil completo", "Contatos ilimitados", "Fotos ilimitadas", "Certificações", "Agenda integrada", "Suporte premium"]', false);

-- Adicionar nova coluna user_type para incluir profissional
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_profiles' AND column_name = 'user_type'
  ) THEN
    ALTER TABLE public.user_profiles 
    ADD COLUMN user_type TEXT DEFAULT 'supporter' 
    CHECK (user_type IN ('supporter', 'establishment', 'group', 'professional'));
  END IF;
END $$;