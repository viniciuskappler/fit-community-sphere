
-- Remover as políticas problemáticas que causam recursão infinita
DROP POLICY IF EXISTS "Admins can view all users" ON public.usuarios;
DROP POLICY IF EXISTS "Admins can update all users" ON public.usuarios;
DROP POLICY IF EXISTS "Admins can delete users" ON public.usuarios;

-- Criar uma função SECURITY DEFINER para verificar se um usuário é admin sem causar recursão
-- Esta função já existe, mas vamos recriar para garantir que está correta
DROP FUNCTION IF EXISTS public.is_admin(uuid);
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE id = user_id AND papel = 'admin'
  );
$$;

-- Adicionar política INSERT para permitir criação de novos usuários
CREATE POLICY "Users can insert their own data" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Recriar as políticas de administrador usando a função segura
CREATE POLICY "Admins can view all users" 
ON public.usuarios 
FOR SELECT 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all users" 
ON public.usuarios 
FOR UPDATE 
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete users" 
ON public.usuarios 
FOR DELETE 
USING (public.is_admin(auth.uid()));

-- Comentários para documentação
COMMENT ON FUNCTION public.is_admin IS 'Verifica se um usuário tem papel de administrador (versão segura sem recursão)';
COMMENT ON POLICY "Users can insert their own data" ON public.usuarios IS 'Permite que usuários insiram seus próprios dados';
COMMENT ON POLICY "Admins can view all users" ON public.usuarios IS 'Permite que administradores vejam todos os usuários (versão segura)';
COMMENT ON POLICY "Admins can update all users" ON public.usuarios IS 'Permite que administradores editem todos os usuários (versão segura)';
COMMENT ON POLICY "Admins can delete users" ON public.usuarios IS 'Permite que administradores deletem usuários (versão segura)';
