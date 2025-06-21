
import React from 'react';

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

const RegistrationProgress = ({ currentStep, totalSteps }: RegistrationProgressProps) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-4 md:mt-6">
      <div 
        className="bg-gradient-to-r from-red-600 to-orange-500 h-2 rounded-full transition-all duration-700 ease-out transform-gpu"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
};

export default RegistrationProgress;
