
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthSecurity } from '@/hooks/useAuthSecurity';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signInWithGoogle: () => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { secureSignIn, secureSignUp } = useAuthSecurity();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.id);
        
        // Only update state synchronously
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle specific events
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in successfully:', session.user.id);
          toast.success('Login realizado com sucesso!');
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed for user:', session?.user?.id);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      console.log('Attempting signup with:', { email, metadata });
      
      const { data, error } = await secureSignUp(email, password, metadata);

      if (error) {
        console.error('Signup error:', error);
        const errorMsg = error.message || 'Erro ao criar conta';
        toast.error(errorMsg);
      } else {
        console.log('Signup successful:', data);
        toast.success('Conta criada com sucesso! Verifique seu email para confirmar.');
      }

      return { data, error };
    } catch (error: any) {
      console.error('Signup exception:', error);
      toast.error('Erro inesperado ao criar conta');
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting secure login for:', email);
      
      const { data, error } = await secureSignIn(email, password);

      if (error) {
        console.error('Login error:', error);
        const errorMsg = error.message || 'Erro ao fazer login';
        toast.error(errorMsg);
      }
      // Success message is handled in the auth state change listener

      return { data, error };
    } catch (error: any) {
      console.error('Login exception:', error);
      toast.error('Erro inesperado ao fazer login');
      return { data: null, error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google login');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Google login error:', error);
        toast.error(error.message || 'Erro ao fazer login com Google');
      }

      return { data, error };
    } catch (error: any) {
      console.error('Google login exception:', error);
      toast.error('Erro inesperado ao fazer login com Google');
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast.error('Erro ao fazer logout');
      } else {
        toast.success('Logout realizado com sucesso!');
      }
    } catch (error: any) {
      console.error('Logout exception:', error);
      toast.error('Erro inesperado ao fazer logout');
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
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
