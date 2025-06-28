
-- First, let's check if email authentication is properly configured
-- We need to ensure the auth settings allow email signups

-- Check current promotional codes to see if there are any active
SELECT * FROM public.promotional_codes WHERE active = true;

-- If no active promo codes exist, let's create one for testing
INSERT INTO public.promotional_codes (code, discount_percent, max_uses, current_uses, active)
VALUES ('TESTE2024', 50, 100, 0, true)
ON CONFLICT (code) DO NOTHING;

-- Let's also check the user_profiles table to see what data we have
-- This will help us understand what's missing from Google signups
SELECT id, full_name, cpf, phone, city, birth_date, promo_code, created_at 
FROM public.user_profiles 
ORDER BY created_at DESC 
LIMIT 10;

-- Check if there are any issues with the handle_new_user function
-- Let's make sure it's working properly for both email and Google auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Enhanced profile creation with better Google data extraction
  INSERT INTO public.user_profiles (
    id, 
    full_name,
    city,
    phone
  )
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'fullName', 
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'given_name' || ' ' || NEW.raw_user_meta_data->>'family_name',
      split_part(COALESCE(NEW.email, ''), '@', 1)
    ),
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'phone'
  );
  
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, update it with any new information
    UPDATE public.user_profiles 
    SET 
      full_name = COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'fullName',
        NEW.raw_user_meta_data->>'name',
        NEW.raw_user_meta_data->>'given_name' || ' ' || NEW.raw_user_meta_data->>'family_name',
        full_name
      ),
      city = COALESCE(NEW.raw_user_meta_data->>'city', city),
      phone = COALESCE(NEW.raw_user_meta_data->>'phone', phone),
      updated_at = now()
    WHERE id = NEW.id;
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log error but don't block user creation
    RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Make sure the trigger exists and is properly configured
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
