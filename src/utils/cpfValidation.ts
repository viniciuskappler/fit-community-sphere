
export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  const firstDigit = remainder >= 10 ? 0 : remainder;
  
  if (parseInt(cleanCPF.charAt(9)) !== firstDigit) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  const secondDigit = remainder >= 10 ? 0 : remainder;
  
  return parseInt(cleanCPF.charAt(10)) === secondDigit;
};

export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const validateAge = (birthDate: string): { isValid: boolean; error?: string } => {
  if (!birthDate) return { isValid: false, error: 'Data de nascimento é obrigatória' };
  
  const birth = new Date(birthDate);
  const today = new Date();
  
  // Verifica se a data não é anterior a 1915
  if (birth.getFullYear() < 1915) {
    return { isValid: false, error: 'Data de nascimento não pode ser anterior a 1915' };
  }
  
  // Calcula a idade
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  // Verifica se tem pelo menos 10 anos
  if (age < 10) {
    return { isValid: false, error: 'Você deve ter pelo menos 10 anos para se cadastrar' };
  }
  
  return { isValid: true };
};
