import { validatePassword } from './passwordValidation';

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormData {
  // Personal Data
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  data_dia: string;
  data_mes: string;
  data_ano: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  
  // Sports Preferences
  esportes_favoritos: string[];
  esportes_praticados: string[];
  esportes_interesse: string[];
  
  // Password
  senha: string;
  confirmar_senha: string;
  
  // Business/Group Data (mantido para compatibilidade)
  businessName: string;
  cnpj: string;
  description: string;
  address: string;
  
  // Terms
  acceptTerms: boolean;
  acceptNewsletter: boolean;
  promoCode: string;
}

export const validateRegistrationForm = (formData: any, currentStep?: number): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Personal data validation (Step 1)
  if (currentStep === 1 || !currentStep) {
    if (!formData.nome?.trim()) {
      errors.nome = 'Nome completo é obrigatório';
    }

    if (!formData.email?.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Formato de email inválido';
      }
    }

    if (!formData.telefone?.trim()) {
      errors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.cpf?.trim()) {
      errors.cpf = 'CPF é obrigatório';
    }

    if (!formData.cep?.trim()) {
      errors.cep = 'CEP é obrigatório';
    }

    if (!formData.rua?.trim()) {
      errors.rua = 'Rua/Avenida é obrigatória';
    }

    if (!formData.numero?.trim()) {
      errors.numero = 'Número é obrigatório';
    }

    if (!formData.bairro?.trim()) {
      errors.bairro = 'Bairro é obrigatório';
    }

    if (!formData.estado?.trim()) {
      errors.estado = 'Estado é obrigatório';
    }

    if (!formData.cidade?.trim()) {
      errors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.data_dia?.trim()) {
      errors.data_dia = 'Dia de nascimento é obrigatório';
    }

    if (!formData.data_mes?.trim()) {
      errors.data_mes = 'Mês de nascimento é obrigatório';
    }

    if (!formData.data_ano?.trim()) {
      errors.data_ano = 'Ano de nascimento é obrigatório';
    }

    // Validar data de nascimento se todos os campos estão preenchidos
    if (formData.data_dia && formData.data_mes && formData.data_ano) {
      const day = parseInt(formData.data_dia);
      const month = parseInt(formData.data_mes);
      const year = parseInt(formData.data_ano);
      
      if (isNaN(day) || day < 1 || day > 31) {
        errors.data_dia = 'Dia inválido';
      }
      
      if (isNaN(month) || month < 1 || month > 12) {
        errors.data_mes = 'Mês inválido';
      }
      
      if (isNaN(year) || year < 1900) {
        errors.data_ano = 'Ano inválido';
      }

      // Verificar idade mínima
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - year;
        
        if (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)) {
          age--;
        }
        
        if (age < 13) {
          errors.data_ano = 'Você deve ter pelo menos 13 anos';
        }
      }
    }
  }

  // Sports preferences validation (Step 2)
  if (currentStep === 2 || !currentStep) {
    if (formData.esportes_favoritos && formData.esportes_favoritos.length < 5) {
      errors.esportes_favoritos = 'Selecione entre 5 e 20 esportes favoritos';
    }
    if (formData.esportes_favoritos && formData.esportes_favoritos.length > 20) {
      errors.esportes_favoritos = 'Máximo de 20 esportes favoritos';
    }
  }

  // Password validation (Step 3)
  if (currentStep === 3 || !currentStep) {
    const passwordValidation = validatePassword(formData.senha || '');
    
    if (!formData.senha) {
      errors.senha = 'Senha é obrigatória';
    } else if (!passwordValidation.isValid) {
      errors.senha = 'Senha não atende aos requisitos de segurança';
    }

    if (!formData.confirmar_senha) {
      errors.confirmar_senha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmar_senha) {
      errors.confirmar_senha = 'Senhas não coincidem';
    }
  }

  return errors;
};

export const validateStep1 = (formData: FormData): ValidationErrors => {
  return validateRegistrationForm(formData, 1);
};

export const validateStep2 = (formData: FormData): ValidationErrors => {
  return validateRegistrationForm(formData, 2);
};

export const validateStep3 = (formData: FormData): ValidationErrors => {
  return validateRegistrationForm(formData, 3);
};

export const validateStep4 = (formData: FormData, registrationType?: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  // Base step 4 validation
  const step4Errors = validateRegistrationForm(formData, 4);
  Object.assign(errors, step4Errors);
  
  // Additional validation for establishments/groups
  if (registrationType === 'establishment' || registrationType === 'group') {
    if (!formData.businessName?.trim()) {
      errors.businessName = `Nome do ${registrationType === 'establishment' ? 'estabelecimento' : 'grupo'} é obrigatório`;
    }
    
    if (!formData.description?.trim()) {
      errors.description = 'Descrição é obrigatória';
    }
    
    if (!formData.address?.trim()) {
      errors.address = 'Endereço é obrigatório';
    }
    
    if (!formData.state?.trim()) {
      errors.state = 'Estado é obrigatório';
    }
    
    if (!formData.cep?.trim()) {
      errors.cep = 'CEP é obrigatório';
    }
  }
  
  // Terms validation - FIXED: Only check for boolean true
  console.log('🔍 VALIDATION DEBUG - acceptTerms:', formData.acceptTerms, 'Type:', typeof formData.acceptTerms);
  console.log('🔍 VALIDATION DEBUG - acceptTerms === true:', formData.acceptTerms === true);
  
  if (formData.acceptTerms !== true) {
    console.log('❌ VALIDATION - Terms not accepted, adding error');
    errors.acceptTerms = 'Você deve aceitar os termos de uso';
  } else {
    console.log('✅ VALIDATION - Terms accepted successfully');
  }
  
  console.log('🔍 VALIDATION RESULT - Final errors:', errors);
  
  return errors;
};

export const getStepTitle = (currentStep: number, registrationType: string): string => {
  switch (currentStep) {
    case 1:
      return 'Dados Pessoais';
    case 2:
      return 'Preferências Esportivas';
    case 3:
      return 'Criar Senha';
    case 4:
      if (registrationType === 'establishment') {
        return 'Dados do Estabelecimento';
      } else if (registrationType === 'group') {
        return 'Dados do Grupo';
      } else if (registrationType === 'professional') {
        return 'Dados Profissionais';
      }
      return 'Finalizar Cadastro';
    default:
      return 'Cadastro';
  }
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    // Parse date string directly to avoid timezone issues
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const day = dateParts[2].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[0];
      return `${day}/${month}/${year}`;
    }
    return dateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const validateField = (fieldName: string, value: any, formData?: any): string | undefined => {
  switch (fieldName) {
    case 'email':
      if (!value?.trim()) return 'E-mail é obrigatório';
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(value)) return 'Formato de email inválido';
      break;
      
    case 'password':
      if (!value) return 'Senha é obrigatória';
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) return 'Senha não atende aos requisitos de segurança';
      break;
      
    case 'confirmPassword':
      if (!value) return 'Confirmação de senha é obrigatória';
      if (formData?.password && value !== formData.password) return 'Senhas não coincidem';
      break;
      
    case 'fullName':
      if (!value?.trim()) return 'Nome completo é obrigatório';
      if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
      break;
      
    case 'phone':
      if (!value?.trim()) return 'Telefone é obrigatório';
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(value)) return 'Formato de telefone inválido';
      break;
      
    default:
      break;
  }
  
  return undefined;
};
