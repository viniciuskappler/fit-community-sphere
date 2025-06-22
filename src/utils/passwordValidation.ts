
export interface PasswordValidation {
  isValid: boolean;
  score: number; // 0-100
  requirements: {
    minLength: boolean;
    hasNumber: boolean;
    hasUppercase: boolean;
    hasSpecialChar: boolean;
  };
  messages: string[];
}

export const validatePassword = (password: string): PasswordValidation => {
  const requirements = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const messages: string[] = [];
  let score = 0;

  if (!requirements.minLength) {
    messages.push('Pelo menos 8 caracteres');
  } else {
    score += 25;
  }

  if (!requirements.hasNumber) {
    messages.push('Pelo menos 1 número');
  } else {
    score += 25;
  }

  if (!requirements.hasUppercase) {
    messages.push('Pelo menos 1 letra maiúscula');
  } else {
    score += 25;
  }

  if (!requirements.hasSpecialChar) {
    messages.push('Pelo menos 1 caractere especial (!@#$%^&*)');
  } else {
    score += 25;
  }

  const isValid = Object.values(requirements).every(Boolean);

  return {
    isValid,
    score,
    requirements,
    messages
  };
};

export const getPasswordStrengthColor = (score: number): string => {
  if (score < 50) return 'text-red-500';
  if (score < 75) return 'text-orange-500';
  if (score < 100) return 'text-yellow-500';
  return 'text-green-500';
};

export const getPasswordStrengthText = (score: number): string => {
  if (score < 50) return 'Fraca';
  if (score < 75) return 'Média';
  if (score < 100) return 'Boa';
  return 'Forte';
};
