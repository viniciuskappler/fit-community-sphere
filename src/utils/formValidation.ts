
export interface FormData {
  // Dados Pessoais
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  city: string;
  birthDate: string;
  
  // Preferências Esportivas
  favoriteStateSports: string[];
  practicedSports: string[];
  interestedSports: string[];
  
  // Dados do Estabelecimento/Grupo
  businessName: string;
  cnpj: string;
  description: string;
  address: string;
  state: string;
  cep: string;
  
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
  birthDate?: string;
  favoriteStateSports?: string;
  practicedSports?: string;
  interestedSports?: string;
  businessName?: string;
  cnpj?: string;
  description?: string;
  address?: string;
  state?: string;
  cep?: string;
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
  }
  
  if (!formData.cpf.trim()) {
    errors.cpf = 'CPF é obrigatório';
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'Telefone é obrigatório';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'E-mail inválido';
  }
  
  if (!formData.city.trim()) {
    errors.city = 'Cidade é obrigatória';
  }
  
  if (!formData.birthDate) {
    errors.birthDate = 'Data de nascimento é obrigatória';
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

export const validateStep3 = (formData: FormData, registrationType: string): ValidationErrors => {
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
      return 'Preferências Esportivas';
    case 3:
      return 'Finalização';
    default:
      return '';
  }
};
