
import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { ValidationErrors } from '../../utils/formValidation';

interface RegistrationAlertsProps {
  registrationType: 'supporter' | 'establishment' | 'group';
  errors: ValidationErrors;
}

const RegistrationAlerts = ({ registrationType, errors }: RegistrationAlertsProps) => {
  return (
    <div className="space-y-3">
      {/* Google Auth Required Alert */}
      {errors.googleRequired && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-800">
            <strong>Cadastro com Google recomendado:</strong> {errors.googleRequired}
          </AlertDescription>
        </Alert>
      )}

      {/* General error alert */}
      {errors.general && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-800">
            {errors.general}
          </AlertDescription>
        </Alert>
      )}

      {/* Registration type specific alerts */}
      {registrationType === 'supporter' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            <strong>Cadastro de Praticante:</strong> Você terá acesso a estabelecimentos esportivos e grupos da sua região.
          </AlertDescription>
        </Alert>
      )}

      {registrationType === 'establishment' && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            <strong>Cadastro de Estabelecimento:</strong> Você poderá divulgar seu estabelecimento esportivo e atrair novos clientes.
          </AlertDescription>
        </Alert>
      )}

      {registrationType === 'group' && (
        <Alert className="border-purple-200 bg-purple-50">
          <Info className="h-4 w-4 text-purple-500" />
          <AlertDescription className="text-purple-700">
            <strong>Cadastro de Grupo Esportivo:</strong> Você poderá organizar e divulgar atividades esportivas em grupo.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RegistrationAlerts;
