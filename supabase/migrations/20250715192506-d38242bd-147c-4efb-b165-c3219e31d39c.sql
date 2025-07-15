
-- Inserir Fernando Ferrari como administrador na tabela usuarios
INSERT INTO public.usuarios (
  id,
  nome,
  email,
  papel,
  squad_code,
  criado_em
) VALUES (
  '4f1b731f-97f1-481b-8861-4423f1e57703',
  'Fernando Ferrari Ribeiro',
  'fernandoferraripessoal90@gmail.com',
  'admin',
  'SQUAD300',
  now()
) ON CONFLICT (id) DO UPDATE SET
  papel = 'admin',
  nome = COALESCE(usuarios.nome, 'Fernando Ferrari Ribeiro'),
  email = COALESCE(usuarios.email, 'fernandoferraripessoal90@gmail.com');

-- Criar políticas RLS para administradores
-- Política para que administradores possam ver todos os usuários
CREATE POLICY "Admins can view all users" 
ON public.usuarios 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = auth.uid() AND papel = 'admin'
  )
);

-- Política para que administradores possam editar todos os usuários
CREATE POLICY "Admins can update all users" 
ON public.usuarios 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = auth.uid() AND papel = 'admin'
  )
);

-- Política para que administradores possam deletar usuários
CREATE POLICY "Admins can delete users" 
ON public.usuarios 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = auth.uid() AND papel = 'admin'
  )
);

-- Habilitar RLS na tabela usuarios
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Política para usuários comuns verem apenas seus próprios dados
CREATE POLICY "Users can view own data" 
ON public.usuarios 
FOR SELECT 
USING (auth.uid() = id);

-- Política para usuários comuns editarem apenas seus próprios dados
CREATE POLICY "Users can update own data" 
ON public.usuarios 
FOR UPDATE 
USING (auth.uid() = id);

-- Função para verificar se o usuário é administrador
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = user_id AND papel = 'admin'
  );
$$;

-- Comentários para documentação
COMMENT ON FUNCTION public.is_admin IS 'Verifica se um usuário tem papel de administrador';
COMMENT ON POLICY "Admins can view all users" ON public.usuarios IS 'Permite que administradores vejam todos os usuários';
COMMENT ON POLICY "Admins can update all users" ON public.usuarios IS 'Permite que administradores editem todos os usuários';
COMMENT ON POLICY "Admins can delete users" ON public.usuarios IS 'Permite que administradores deletem usuários';
