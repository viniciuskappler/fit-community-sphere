
export interface FormData {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  city: string;
  birthDate: string;
  favoriteStateSports: string[];
  practicedSports: string[];
  interestedSports: string[];
  businessName: string;
  cnpj: string;
  description: string;
  address: string;
  state: string;
  cep: string;
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
  businessName?: string;
  description?: string;
  address?: string;
  state?: string;
  cep?: string;
  acceptTerms?: string;
}

export const validateStep1 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = 'Você esqueceu de preencher esse campo.';
  }
  if (!formData.cpf.trim()) {
    errors.cpf = 'Você esqueceu de preencher esse campo.';
  }
  if (!formData.phone.trim()) {
    errors.phone = 'Você esqueceu de preencher esse campo.';
  }
  if (!formData.email.trim()) {
    errors.email = 'Você esqueceu de preencher esse campo.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Esse campo foi preenchido incorretamente.';
  }
  if (!formData.city.trim()) {
    errors.city = 'Você esqueceu de preencher esse campo.';
  }
  if (!formData.birthDate.trim()) {
    errors.birthDate = 'Você esqueceu de preencher esse campo.';
  }

  return errors;
};

export const validateStep2 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (formData.favoriteStateSports.length < 5) {
    errors.favoriteStateSports = 'Você deve selecionar pelo menos 5 modalidades que mais gosta.';
  } else if (formData.favoriteStateSports.length > 20) {
    errors.favoriteStateSports = 'Você pode selecionar no máximo 20 modalidades.';
  }

  return errors;
};

export const validateStep3 = (formData: FormData, registrationType: 'supporter' | 'establishment' | 'group'): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (registrationType !== 'supporter') {
    if (!formData.businessName.trim()) {
      errors.businessName = 'Você esqueceu de preencher esse campo.';
    }
    if (!formData.description.trim()) {
      errors.description = 'Você esqueceu de preencher esse campo.';
    }
    if (!formData.address.trim()) {
      errors.address = 'Você esqueceu de preencher esse campo.';
    }
    if (!formData.state.trim()) {
      errors.state = 'Você esqueceu de preencher esse campo.';
    }
    if (!formData.cep.trim()) {
      errors.cep = 'Você esqueceu de preencher esse campo.';
    }
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = 'Você deve aceitar os termos para continuar.';
  }

  return errors;
};

export const isStep1Valid = (formData: FormData) => {
  const errors = validateStep1(formData);
  return Object.keys(errors).length === 0;
};

export const isStep2Valid = (formData: FormData) => {
  const errors = validateStep2(formData);
  return Object.keys(errors).length === 0;
};

export const isStep3Valid = (formData: FormData, registrationType: 'supporter' | 'establishment' | 'group') => {
  const errors = validateStep3(formData, registrationType);
  return Object.keys(errors).length === 0;
};

export const getStepTitle = (currentStep: number, registrationType: 'supporter' | 'establishment' | 'group') => {
  switch (currentStep) {
    case 1: return 'Dados Pessoais';
    case 2: return 'Preferências Esportivas';
    case 3: return registrationType === 'supporter' ? 'Confirmação' : 
             registrationType === 'establishment' ? 'Dados do Estabelecimento' : 'Dados do Grupo';
    default: return '';
  }
};

export const formatDateForDisplay = (dateValue: string) => {
  if (!dateValue) return '';
  const [year, month, day] = dateValue.split('-');
  return `${day}/${month}/${year}`;
};
