
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ data?: any; error?: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ data?: any; error?: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error?: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para verificar e criar usuário na tabela usuarios (agora com RLS corrigido)
  const ensureUserInUsuariosTable = async (userId: string, userEmail?: string) => {
    try {
      console.log('🔍 Verificando usuário na tabela usuarios:', userId);
      
      const { data: existingUser, error: checkError } = await supabase
        .from('usuarios')
        .select('id, papel')
        .eq('id', userId)
        .maybeSingle(); // Usando maybeSingle em vez de single para evitar erros

      if (checkError) {
        console.error('❌ Erro ao verificar usuário:', checkError);
        return;
      }

      if (!existingUser) {
        console.log('📝 Criando novo usuário na tabela usuarios');
        // Inserir novo usuário com papel padrão 'comum'
        const { error: insertError } = await supabase
          .from('usuarios')
          .insert({
            id: userId,
            squad_code: 'SQUAD300',
            nome: userEmail?.split('@')[0] || '',
            email: userEmail || '',
            papel: 'comum'
          });

        if (insertError) {
          console.error('❌ Erro ao criar usuário na tabela usuarios:', insertError);
        } else {
          console.log('✅ Usuário criado na tabela usuarios com sucesso');
        }
      } else {
        console.log('✅ Usuário já existe na tabela usuarios, papel:', existingUser.papel);
      }
    } catch (error) {
      console.error('💥 Erro inesperado ao garantir usuário na tabela usuarios:', error);
    }
  };

  useEffect(() => {
    console.log('🔧 Configurando listener de autenticação...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Estado de autenticação mudou:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ Usuário logado com sucesso');
          toast.success('Login realizado com sucesso!');
          
          // Garantir que o usuário existe na tabela usuarios (agora com RLS seguro)
          await ensureUserInUsuariosTable(session.user.id, session.user.email);
          
          // Redirecionar para dashboard após login
          if (window.location.pathname === '/') {
            console.log('🔄 Redirecionando para dashboard...');
            window.location.href = '/dashboard';
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Usuário deslogado');
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📋 Sessão inicial obtida:', session?.user?.email || 'Nenhuma sessão');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('🔌 Desconectando listener de autenticação');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    console.log('🚀 Iniciando processo de cadastro para:', email);
    try {
      const redirectUrl = `${window.location.origin}/hub`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata || {}
        }
      });

      if (error) {
        console.error('❌ Erro no cadastro:', error);
        return { data, error };
      }

      console.log('✅ Cadastro realizado com sucesso:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('💥 Exceção no cadastro:', error);
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Iniciando processo de login para:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Erro no login:', error);
        return { data, error };
      }

      console.log('✅ Login realizado com sucesso');
      return { data, error: null };
    } catch (error: any) {
      console.error('💥 Exceção no login:', error);
      return { error: error as AuthError };
    }
  };

  const signInWithGoogle = async () => {
    console.log('🔍 Iniciando login com Google...');
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        console.error('❌ Erro no login com Google:', error);
        toast.error('Erro ao fazer login com Google');
        return { error };
      }

      console.log('🔄 Login com Google iniciado');
      return { error: null };
    } catch (error: any) {
      console.error('💥 Exceção no login com Google:', error);
      toast.error('Erro inesperado no login com Google');
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    console.log('👋 Fazendo logout...');
    try {
      // Limpar o estado local primeiro
      setUser(null);
      setSession(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Erro no logout:', error);
        toast.error('Erro ao fazer logout');
        return;
      }

      console.log('✅ Logout realizado com sucesso');
      toast.success('Logout realizado com sucesso!');
      
      // Aguardar um pouco para o toast aparecer antes de redirecionar
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('💥 Exceção no logout:', error);
      toast.error('Erro inesperado no logout');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
