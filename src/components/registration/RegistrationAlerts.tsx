
import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';
import { ValidationErrors } from '../../utils/formValidation';

interface RegistrationAlertsProps {
  registrationType: 'supporter' | 'establishment' | 'group';
  errors: ValidationErrors;
}

const RegistrationAlerts = ({ registrationType, errors }: RegistrationAlertsProps) => {
  return (
    <>
      {/* Warning message for Establishment and Sports Group */}
      {(registrationType === 'establishment' || registrationType === 'group') && (
        <Alert className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-300 mt-4">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 font-medium text-sm">
            Primeiro você precisa fazer o seu cadastro como Participante, depois você poderá cadastrar seu {registrationType === 'establishment' ? 'Estabelecimento' : 'Grupo Esportivo'} :)
          </AlertDescription>
        </Alert>
      )}

      {errors.general && (
        <Alert className="bg-blue-50 border border-blue-200 mt-4">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 font-medium">
            {errors.general}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default RegistrationAlerts;
