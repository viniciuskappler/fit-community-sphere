import { validatePassword } from './passwordValidation';

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormData {
  // Personal Data
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  birthDate: string;
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
  cityIbgeCode: string;
  
  // Sports Preferences
  favoriteStateSports: string[];
  practicedSports: string[];
  interestedSports: string[];
  
  // Password
  password: string;
  confirmPassword: string;
  
  // Business/Group Data
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

  // Personal data validation
  if (currentStep === 1 || !currentStep) {
    if (!formData.fullName?.trim()) {
      errors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email?.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Formato de email inválido';
      }
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Telefone é obrigatório';
    }

    if (!formData.cpf?.trim()) {
      errors.cpf = 'CPF é obrigatório';
    }
  }

  // Sports preferences validation (step 2)
  if (currentStep === 2 || !currentStep) {
    // Sports preferences are optional, no validation needed
  }

  // Password validation (step 3)
  if (currentStep === 3 || !currentStep) {
    const passwordValidation = validatePassword(formData.password || '');
    
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (!passwordValidation.isValid) {
      errors.password = 'Senha não atende aos requisitos de segurança';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Senhas não coincidem';
    }
  }

  // Location and final step validation
  if (currentStep === 4 || !currentStep) {
    if (!formData.state?.trim()) {
      errors.state = 'Estado é obrigatório';
    }

    if (!formData.city?.trim()) {
      errors.city = 'Cidade é obrigatória';
    }

    if (!formData.birthDate) {
      errors.birthDate = 'Data de nascimento é obrigatória';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 13) {
        errors.birthDate = 'Você deve ter pelo menos 13 anos';
      }
      
      if (birthDate > today) {
        errors.birthDate = 'Data de nascimento não pode ser no futuro';
      }
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
  
  // Terms validation
  if (!formData.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos de uso';
  }
  
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
      }
      return 'Finalizar Cadastro';
    default:
      return 'Cadastro';
  }
};

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
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
