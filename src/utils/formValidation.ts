
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

export const isStep1Valid = (formData: FormData) => {
  return formData.fullName.trim() !== '' &&
         formData.cpf.trim() !== '' &&
         formData.phone.trim() !== '' &&
         formData.email.trim() !== '' &&
         formData.city.trim() !== '' &&
         formData.birthDate.trim() !== '';
};

export const isStep2Valid = (formData: FormData) => {
  return formData.favoriteStateSports.length === 5;
};

export const isStep3Valid = (formData: FormData, registrationType: 'supporter' | 'establishment' | 'group') => {
  if (registrationType === 'supporter') {
    return formData.acceptTerms;
  } else {
    return formData.businessName.trim() !== '' &&
           formData.description.trim() !== '' &&
           formData.address.trim() !== '' &&
           formData.state.trim() !== '' &&
           formData.cep.trim() !== '' &&
           formData.acceptTerms;
  }
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
