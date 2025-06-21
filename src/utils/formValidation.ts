
import { validateCPF, validateAge } from './cpfValidation';

export interface FormData {
  // Dados Pessoais
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
  cityIbgeCode?: string;
  
  // Preferências Esportivas
  favoriteStateSports: string[];
  practicedSports: string[];
  interestedSports: string[];
  
  // Senha
  password: string;
  confirmPassword: string;
  
  // Dados do Estabelecimento/Grupo
  businessName: string;
  cnpj: string;
  description: string;
  address: string;
  
  // Termos
  acceptTerms: boolean;
  acceptNewsletter: boolean;
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
}

export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return date.toLocaleDateString('pt-BR');
};

export const validateStep1 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.fullName.trim()) {
    errors.fullName = 'Nome é obrigatório';
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Nome deve ter pelo menos 3 caracteres';
  }
  
  if (!formData.cpf.trim()) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!validateCPF(formData.cpf)) {
    errors.cpf = 'CPF inválido';
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'Telefone é obrigatório';
  } else if (formData.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Telefone deve ter pelo menos 10 dígitos';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'E-mail inválido';
  }
  
  if (!formData.state.trim()) {
    errors.state = 'Estado é obrigatório';
  }
  
  if (!formData.city.trim()) {
    errors.city = 'Cidade é obrigatória';
  }

  // Validações de endereço
  if (!formData.street.trim()) {
    errors.street = 'Rua é obrigatória';
  }
  
  if (!formData.number.trim()) {
    errors.number = 'Número é obrigatório';
  }
  
  if (!formData.neighborhood.trim()) {
    errors.neighborhood = 'Bairro é obrigatório';
  }
  
  if (!formData.cep.trim()) {
    errors.cep = 'CEP é obrigatório';
  } else if (formData.cep.replace(/\D/g, '').length !== 8) {
    errors.cep = 'CEP deve ter 8 dígitos';
  }
  
  if (!formData.birthDate) {
    errors.birthDate = 'Data de nascimento é obrigatória';
  } else {
    const ageValidation = validateAge(formData.birthDate);
    if (!ageValidation.isValid) {
      errors.birthDate = ageValidation.error;
    }
  }
  
  return errors;
};

export const validateStep2 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (formData.favoriteStateSports.length < 5) {
    errors.favoriteStateSports = 'Selecione pelo menos 5 esportes favoritos';
  }
  
  return errors;
};

export const validateStep3 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.password) {
    errors.password = 'Senha é obrigatória';
  } else {
    if (formData.password.length < 8) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres';
    } else if (!/\d/.test(formData.password)) {
      errors.password = 'A senha deve conter pelo menos 1 número';
    }
  }
  
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'As senhas não coincidem';
  }
  
  return errors;
};

export const validateStep4 = (formData: FormData, registrationType: string): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos de uso';
  }
  
  return errors;
};

export const getStepTitle = (step: number, registrationType: string): string => {
  switch (step) {
    case 1:
      return 'Dados Pessoais';
    case 2:
      return 'Escolha seus Esportes preferidos!';
    case 3:
      return 'Criar Senha';
    case 4:
      return 'Conclua seu cadastro';
    default:
      return '';
  }
};
