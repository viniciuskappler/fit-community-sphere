
import { supabase } from '@/integrations/supabase/client';

export default async function logoutUsuario() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Erro ao sair:', error.message);
    return;
  }

  window.location.href = '/';
}
