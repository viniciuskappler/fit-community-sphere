
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRegistrationSecurity } from './useRegistrationSecurity';
import { toast } from 'sonner';

interface RegistrationData {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  data_nascimento: string;
  esportes_favoritos: string[];
  esportes_praticados: string[];
  esportes_interesse: string[];
  senha: string;
  promoCode?: string;
}

interface RegistrationResult {
  success: boolean;
  error?: string;
  userId?: string;
  requiresGoogleAuth?: boolean;
}

export const useRegistration = () => {
  const { signUp } = useAuth();
  const { 
    checkRegistrationRateLimit, 
    logRegistrationAttempt, 
    handleRateLimitExceeded,
    isCheckingRate 
  } = useRegistrationSecurity();
  const [loading, setLoading] = useState(false);

  const registerUser = async (
    data: RegistrationData,
    registrationType: 'supporter' | 'establishment' | 'group',
    referralCode?: string
  ): Promise<RegistrationResult> => {
    console.log('🚀 Starting registration submission...');
    console.log('📊 Registration data:', {
      email: data.email,
      nome: data.nome,
      registrationType,
      hasPromoCode: !!data.promoCode,
      sportsCount: {
        favorite: data.esportes_favoritos.length,
        practiced: data.esportes_praticados.length,
        interested: data.esportes_interesse.length
      }
    });
    
    setLoading(true);

    try {
      // 1. Check registration rate limiting
      console.log('🔒 Checking registration rate limits...');
      const rateLimitResult = await checkRegistrationRateLimit(data.email);
      
      if (rateLimitResult.isRateLimited) {
        console.warn('⚠️ Rate limit exceeded');
        handleRateLimitExceeded(rateLimitResult.emailAttempts, rateLimitResult.ipAttempts);
        return {
          success: false,
          error: 'Limite de tentativas de cadastro excedido. Tente novamente mais tarde.'
        };
      }

      // 2. Create user account with enhanced metadata
      console.log('👤 Creating user account...');
      const { data: signUpData, error: signUpError } = await signUp(data.email, data.senha, {
        nome: data.nome,
        full_name: data.nome,
        registration_type: registrationType,
        promo_code: data.promoCode,
        cpf: data.cpf,
        telefone: data.telefone,
        cidade: data.cidade,
        estado: data.estado,
        data_nascimento: data.data_nascimento
      });
      
      // 3. Log registration attempt
      await logRegistrationAttempt(data.email, !signUpError);
      
      if (signUpError) {
        console.error('❌ Signup failed:', signUpError);
        
        // Enhanced error handling for registration
        if (signUpError.message.includes('Email signups are disabled') || 
            signUpError.message.includes('Signups not allowed') ||
            signUpError.message.includes('Cadastro temporariamente indisponível')) {
          
          console.warn('⚠️ Email signups disabled, requiring Google auth');
          toast.error('Cadastro por email temporariamente desabilitado. Use o Google para se cadastrar.');
          
          return {
            success: false,
            error: 'O cadastro tradicional está temporariamente indisponível. Por favor, use a opção "Cadastrar com Google" no início do formulário.',
            requiresGoogleAuth: true
          };
        } else if (signUpError.message.includes('User already registered')) {
          return {
            success: false,
            error: 'Este e-mail já está cadastrado. Tente fazer login ou use a opção "Esqueci minha senha".'
          };
        } else if (signUpError.message.includes('Invalid email')) {
          return {
            success: false,
            error: 'E-mail inválido. Verifique o formato do e-mail.'
          };
        }
        
        return {
          success: false,
          error: signUpError.message || 'Erro ao criar conta. Tente novamente.'
        };
      }

      const newUserId = signUpData?.user?.id;
      if (!newUserId) {
        console.error('❌ No user ID returned from signup');
        return {
          success: false,
          error: 'Erro ao obter ID do usuário criado.'
        };
      }

      console.log('✅ User account created successfully with ID:', newUserId);

      // 4. Verificar se o usuário já existe na tabela usuarios
      console.log('🔍 Verificando se usuário já existe...');
      const { data: existingUser } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', data.email)
        .single();

      if (existingUser) {
        return {
          success: false,
          error: 'Este e-mail já está cadastrado. Faça login.'
        };
      }

      // 5. Criar registro na tabela usuarios
      console.log('💾 Criando registro na tabela usuarios...');
      const { error: usuarioError } = await supabase
        .from('usuarios')
        .insert({
          id: newUserId,
          nome: data.nome,
          cpf: data.cpf,
          telefone: data.telefone,
          email: data.email,
          cep: data.cep,
          rua: data.rua,
          numero: data.numero,
          bairro: data.bairro,
          estado: data.estado,
          cidade: data.cidade,
          data_nascimento: data.data_nascimento,
          esportes_favoritos: data.esportes_favoritos,
          esportes_praticados: data.esportes_praticados,
          esportes_interesse: data.esportes_interesse,
          squad_code: 'SQUAD300'
        });

      if (usuarioError) {
        console.error('❌ Error creating user in usuarios table:', usuarioError);
        
        if (usuarioError.message.includes('duplicate') || usuarioError.message.includes('already exists')) {
          return {
            success: false,
            error: 'Este e-mail ou CPF já está cadastrado. Faça login.'
          };
        }
        
        toast.error('Erro ao salvar dados do usuário');
        return {
          success: false,
          error: 'Erro ao salvar dados do usuário'
        };
      } else {
        console.log('✅ User created in usuarios table successfully');
      }

      // Funcionalidade de referral temporariamente desabilitada
      // if (referralCode) {
      //   await trackReferralConversion(referralCode, newUserId, registrationType);
      // }

      console.log('🎉 Registration completed successfully!');
      
      // Success message based on promo code
      if (data.promoCode === 'SQUAD300') {
        toast.success('🎉 Bem-vindo ao SQUAD 300! Desconto vitalício garantido!');
      } else {
        toast.success('Cadastro realizado com sucesso! Verifique seu email para confirmar.');
      }
      
      return {
        success: true,
        userId: newUserId
      };

    } catch (error: any) {
      console.error('💥 Unexpected registration error:', error);
      // Log failed attempt for unexpected errors too
      await logRegistrationAttempt(data.email, false);
      toast.error('Erro inesperado durante o cadastro');
      
      return {
        success: false,
        error: error.message || 'Erro inesperado. Tente novamente.'
      };
    } finally {
      setLoading(false);
    }
  };

  const trackReferralConversion = async (
    referralCode: string,
    userId: string,
    conversionType: string
  ) => {
    // Funcionalidade de referral temporariamente desabilitada
    console.log('Referral tracking disabled:', referralCode);
  };

  return {
    registerUser,
    loading: loading || isCheckingRate
  };
};
