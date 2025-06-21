
import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  loading, 
  onPrevious, 
  onNext, 
  onSubmit 
}: NavigationButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 md:mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1 || loading}
        className="flex items-center justify-center space-x-2 order-2 sm:order-1 border-gray-300 hover:border-orange-400 hover:text-orange-600"
      >
        <ArrowLeft size={16} />
        <span>Voltar</span>
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNext}
          disabled={loading}
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 flex items-center justify-center space-x-2 order-1 sm:order-2"
        >
          <span>Próximo</span>
          <ArrowRight size={16} />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 flex items-center justify-center space-x-2 order-1 sm:order-2"
        >
          <Check size={16} />
          <span>{loading ? 'Finalizando...' : 'Finalizar Cadastro'}</span>
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
