
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

-- Inserir os planos estratégicos conforme definido
INSERT INTO public.subscription_plans (name, type, price_monthly, price_yearly, features, is_free) VALUES
-- Planos Praticante
('Praticante Gratuito', 'supporter', 0, 0, '["Buscar estabelecimentos", "Buscar grupos", "Perfil básico", "Até 3 contatos por mês"]', true),
('Praticante Premium', 'supporter', 29.90, 299.00, '["Busca ilimitada de estabelecimentos", "Recomendações personalizadas com IA", "Contatos ilimitados", "Filtros avançados", "Notificações de novas atividades", "Sistema de conquistas", "Acesso a promoções exclusivas", "Histórico completo", "Eventos premium", "Suporte prioritário 24/7"]', false),

-- Planos Estabelecimento
('Estabelecimento Gratuito', 'establishment', 0, 0, '["Cadastro básico", "Até 5 fotos", "Informações de contato", "Horários básicos"]', true),
('Estabelecimento Premium', 'establishment', 149.90, 1499.00, '["Perfil completo e destacado", "Galeria ilimitada", "Analytics detalhados", "Posicionamento prioritário", "Gerenciamento avançado", "Sistema de agendamento", "Gestão de avaliações", "App dedicado", "Sistema de promoções", "Campanhas de marketing"]', false),

-- Planos Grupo Esportivo
('Grupo Gratuito', 'group', 0, 0, '["Cadastro básico", "Até 3 fotos", "Lista básica de atividades", "Informações de contato"]', true),
('Grupo Premium', 'group', 79.90, 799.00, '["Gerenciamento completo de membros", "Calendário avançado", "Galeria ilimitada", "Divulgação prioritária", "Sistema de chat interno", "Relatórios de participação", "Sistema de ranking", "Notificações push", "Gestão financeira", "Ferramentas de organização"]', false),

-- Planos Profissional
('Profissional Gratuito', 'professional', 0, 0, '["Perfil básico", "Até 3 certificações", "Informações de contato", "Especialidades básicas"]', true),
('Profissional Premium', 'professional', 79.90, 799.00, '["Perfil profissional destacado", "Certificações ilimitadas", "Portfólio completo", "Sistema de agendamento", "Gestão de avaliações", "Dashboard de performance", "Sistema de cobrança", "Leads qualificados", "App dedicado", "Marketing pessoal automatizado"]', false);
