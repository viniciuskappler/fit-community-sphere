import { isValidCPF } from '@brazilian-utils/cpf';

export interface FormData {
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
  favoriteStateSports: string[];
  practicedSports: string[];
  interestedSports: string[];
  password: string;
  confirmPassword: string;
  businessName: string;
  cnpj: string;
  description: string;
  address: string;
  acceptTerms: boolean;
  acceptNewsletter: boolean;
  promoCode: string;
}

export interface ValidationErrors {
  fullName?: string;
  cpf?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  birthDate?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  cep?: string;
  favoriteStateSports?: string;
  practicedSports?: string;
  interestedSports?: string;
  password?: string;
  confirmPassword?: string;
  businessName?: string;
  cnpj?: string;
  description?: string;
  address?: string;
  acceptTerms?: string;
  general?: string;
  promo?: string;
}

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const validateStep1 = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Nome completo é obrigatório';
  }

  if (!data.cpf.trim()) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!isValidCPF(data.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Telefone é obrigatório';
  }

  if (!data.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'E-mail inválido';
  }

  if (!data.state.trim()) {
    errors.state = 'Estado é obrigatório';
  }

  if (!data.city.trim()) {
    errors.city = 'Cidade é obrigatória';
  }

  if (!data.street.trim()) {
    errors.street = 'Rua é obrigatória';
  }

  if (!data.number.trim()) {
    errors.number = 'Número é obrigatório';
  }

  if (!data.neighborhood.trim()) {
    errors.neighborhood = 'Bairro é obrigatório';
  }

  if (!data.cep.trim()) {
    errors.cep = 'CEP é obrigatório';
  }

  if (!data.birthDate) {
    errors.birthDate = 'Data de nascimento é obrigatória';
  } else {
    const birthDate = new Date(data.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      const adjustedAge = age - 1;
      if (adjustedAge < 16) {
        errors.birthDate = 'Você deve ter pelo menos 16 anos para se cadastrar';
      }
    } else if (age < 16) {
      errors.birthDate = 'Você deve ter pelo menos 16 anos para se cadastrar';
    }
  }

  return errors;
};

export const validateStep2 = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (data.favoriteStateSports.length === 0) {
    errors.favoriteStateSports = 'Selecione pelo menos um esporte favorito';
  }

  if (data.practicedSports.length === 0) {
    errors.practicedSports = 'Selecione pelo menos um esporte que você pratica';
  }

  if (data.interestedSports.length === 0) {
    errors.interestedSports = 'Selecione pelo menos um esporte de interesse';
  }

  return errors;
};

export const validateStep3 = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.password) {
    errors.password = 'Senha é obrigatória';
  } else if (data.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Senhas não coincidem';
  }

  return errors;
};

export const validateStep4 = (data: FormData, registrationType: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos para continuar';
  }

  return errors;
};

export const getStepTitle = (step: number, registrationType: string): string => {
  switch (step) {
    case 1:
      return 'Dados Pessoais';
    case 2:
      return 'Preferências Esportivas';
    case 3:
      return 'Criar Senha';
    case 4:
      return 'Finalizar Cadastro';
    default:
      return '';
  }
};
