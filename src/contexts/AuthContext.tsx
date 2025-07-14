
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

  // Função para verificar e criar usuário na tabela usuarios
  const ensureUserInUsuariosTable = async (userId: string, userEmail?: string) => {
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('id', userId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Erro ao verificar usuário:', checkError);
        return;
      }

      if (!existingUser) {
        const { error: insertError } = await supabase
          .from('usuarios')
          .insert({
            id: userId,
            code: 'SQUAD300',
            name: userEmail?.split('@')[0] || '',
            city: '',
            sport: ''
          });

        if (insertError) {
          console.error('Erro ao criar usuário na tabela usuarios:', insertError);
        } else {
          console.log('✅ Usuário criado na tabela usuarios com sucesso');
        }
      }
    } catch (error) {
      console.error('Erro ao garantir usuário na tabela usuarios:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ User signed in successfully');
          toast.success('Login realizado com sucesso!');
          
          // Garantir que o usuário existe na tabela usuarios
          await ensureUserInUsuariosTable(session.user.id, session.user.email);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    console.log('🚀 Starting signup process for:', email);
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
        console.error('❌ Signup error:', error);
        return { data, error };
      }

      console.log('✅ Signup successful:', data);
      return { data, error: null };
    } catch (error: any) {
      console.error('💥 Signup exception:', error);
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Starting signin process for:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Signin error:', error);
        return { data, error };
      }

      console.log('✅ Signin successful');
      return { data, error: null };
    } catch (error: any) {
      console.error('💥 Signin exception:', error);
      return { error: error as AuthError };
    }
  };

  const signInWithGoogle = async () => {
    console.log('🔍 Starting Google signin...');
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
        console.error('❌ Google signin error:', error);
        toast.error('Erro ao fazer login com Google');
        return { error };
      }

      console.log('🔄 Google signin initiated');
      return { error: null };
    } catch (error: any) {
      console.error('💥 Google signin exception:', error);
      toast.error('Erro inesperado no login com Google');
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    console.log('👋 Signing out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Signout error:', error);
        toast.error('Erro ao fazer logout');
      } else {
        console.log('✅ Signout successful');
        toast.success('Logout realizado com sucesso!');
      }
    } catch (error) {
      console.error('💥 Signout exception:', error);
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
