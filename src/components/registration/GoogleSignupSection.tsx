
import React from 'react';
import GoogleAuthButton from '../GoogleAuthButton';
import { ValidationErrors } from '../../utils/formValidation';

interface GoogleSignupSectionProps {
  onGoogleSignup: () => Promise<void>;
  googleLoading: boolean;
  errors: ValidationErrors;
}

const GoogleSignupSection = ({ 
  onGoogleSignup, 
  googleLoading,
  errors 
}: GoogleSignupSectionProps) => {
  return (
    <div className="mb-6 space-y-4">
      <GoogleAuthButton
        onClick={onGoogleSignup}
        loading={googleLoading}
        text="Cadastrar com Google"
      />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Ou continue com</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignupSection;
