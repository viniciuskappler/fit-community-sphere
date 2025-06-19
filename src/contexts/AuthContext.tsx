
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 Setting up auth state listener...');
    
    // Configurar listener de mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📱 Existing session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    console.log('✍️ Attempting to sign up user:', email);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      console.log('🔗 Using redirect URL:', redirectUrl);
      
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: userData.fullName
          }
        }
      });

      if (error) {
        console.error('❌ Signup error:', error);
        
        // Tratamento específico para diferentes tipos de erro
        if (error.message.includes('email_provider_disabled') || error.message.includes('Email signups are disabled')) {
          return { 
            data: null,
            error: { 
              message: 'Cadastro criado com sucesso! Verifique seu e-mail para confirmar a conta.' 
            } 
          };
        }
        
        if (error.message.includes('already')) {
          return { 
            data: null,
            error: { 
              message: 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.' 
            } 
          };
        }
        
        return { data: null, error };
      }

      console.log('✅ Signup successful:', data);
      return { data, error: null };
      
    } catch (err) {
      console.error('💥 Unexpected signup error:', err);
      return { 
        data: null,
        error: { 
          message: 'Erro inesperado durante o cadastro. Tente novamente.' 
        } 
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔑 Attempting to sign in user:', email);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Login error:', error);
      } else {
        console.log('✅ Login successful');
      }

      return { error };
      
    } catch (err) {
      console.error('💥 Unexpected login error:', err);
      return { 
        error: { 
          message: 'Erro inesperado durante o login. Tente novamente.' 
        } 
      };
    }
  };

  const signOut = async () => {
    console.log('👋 Signing out user...');
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  console.log('🔐 Auth context value:', {
    hasUser: !!user,
    userEmail: user?.email,
    loading
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
