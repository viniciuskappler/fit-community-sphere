-- Limpeza e correção das políticas RLS problemáticas

-- 1. Limpar políticas duplicadas na tabela user_profiles
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;

-- 2. Recriar políticas limpas e corretas para user_profiles
CREATE POLICY "Users can manage their own profile"
ON public.user_profiles
FOR ALL
TO public
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 3. Verificar e recriar o trigger para criação automática de perfis
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 4. Melhorar a função handle_new_user para ser mais robusta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Criar perfil do usuário com dados básicos
  INSERT INTO public.user_profiles (
    id, 
    full_name,
    city,
    phone,
    user_type
  )
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'given_name' || ' ' || NEW.raw_user_meta_data->>'family_name',
      split_part(COALESCE(NEW.email, ''), '@', 1)
    ),
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'supporter')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      EXCLUDED.full_name
    ),
    city = COALESCE(NEW.raw_user_meta_data->>'city', EXCLUDED.city),
    phone = COALESCE(NEW.raw_user_meta_data->>'phone', EXCLUDED.phone),
    user_type = COALESCE(NEW.raw_user_meta_data->>'user_type', EXCLUDED.user_type),
    updated_at = now();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log erro mas não bloqueia criação do usuário
    RAISE WARNING 'Erro ao criar perfil para usuário %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- 5. Recriar o trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. Corrigir políticas de INSERT para establishments e sports_groups
-- Para que funcionem corretamente quando usuário está autenticado
DROP POLICY IF EXISTS "Users can insert their own establishments" ON public.establishments;
CREATE POLICY "Users can insert their own establishments"
ON public.establishments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own groups" ON public.sports_groups;
CREATE POLICY "Users can insert their own groups"
ON public.sports_groups
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 7. Garantir que subscription_plans esteja acessível
DROP POLICY IF EXISTS "Anyone can view subscription plans" ON public.subscription_plans;
CREATE POLICY "Anyone can view subscription plans"
ON public.subscription_plans
FOR SELECT
TO public
USING (active = true);