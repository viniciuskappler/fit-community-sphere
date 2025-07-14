
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';
import GoogleSignupSection from './registration/GoogleSignupSection';
import BasicSignupForm from './registration/BasicSignupForm';
import { ValidationErrors } from '../utils/formValidation';

interface SimpleRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  promoCode?: string;
}

const SimpleRegistrationModal = ({ isOpen, onClose, promoCode = 'SQUAD300' }: SimpleRegistrationModalProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailSignup = async (email: string, password: string) => {
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await signUp(email, password, {
        promo_code: promoCode
      });

      if (error) {
        setErrors({ general: error.message });
      } else if (data.user) {
        onClose();
        navigate('/completar-perfil');
      }
    } catch (error: any) {
      setErrors({ general: 'Erro inesperado. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setErrors({});

    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        setErrors({ general: 'Erro ao cadastrar com Google. Tente novamente.' });
      } else {
        onClose();
        navigate('/completar-perfil');
      }
    } catch (error: any) {
      setErrors({ general: 'Erro inesperado ao cadastrar com Google' });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95%] mx-auto bg-white rounded-xl border-0 shadow-2xl">
        <DialogHeader className="relative pb-4">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Cadastrar agora
          </DialogTitle>
        </DialogHeader>

        <div className="px-2">
          {/* Código promocional fixo */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Código promocional ativo:</p>
              <p className="text-lg font-bold text-orange-600">{promoCode}</p>
              <p className="text-xs text-gray-500">Desconto especial para os primeiros 300 cadastros</p>
            </div>
          </div>

          <GoogleSignupSection
            onGoogleSignup={handleGoogleSignup}
            googleLoading={googleLoading}
            errors={errors}
          />

          <BasicSignupForm
            onSubmit={handleEmailSignup}
            loading={loading}
            errors={errors}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleRegistrationModal;
