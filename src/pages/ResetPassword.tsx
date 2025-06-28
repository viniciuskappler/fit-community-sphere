
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { validatePassword } from '@/utils/passwordValidation';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isValidToken, setIsValidToken] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Verificar se temos os parâmetros necessários na URL
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const type = searchParams.get('type');

    if (!accessToken || !refreshToken || type !== 'recovery') {
      setIsValidToken(false);
      return;
    }

    // Configurar a sessão com os tokens recebidos
    const setSession = async () => {
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });

      if (error) {
        console.error('Erro ao configurar sessão:', error);
        setIsValidToken(false);
      }
    };

    setSession();
  }, [searchParams]);

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Por favor, insira uma nova senha');
      return;
    }

    if (!passwordValidation.isValid) {
      setError('A senha não atende aos critérios de segurança');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error('Erro ao atualizar senha:', error);
        setError('Erro ao atualizar senha. Tente novamente.');
      } else {
        setPasswordChanged(true);
        toast.success('Senha alterada com sucesso!');
        
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Erro inesperado:', error);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Link Inválido
            </CardTitle>
            <CardDescription className="text-gray-600">
              Este link de recuperação é inválido ou expirou
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-red-200 bg-red-50 mb-4">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                O link pode ter expirado ou já foi utilizado. Solicite um novo link de recuperação.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-3">
              <Button 
                onClick={() => navigate('/forgot-password')}
                className="w-full"
              >
                Solicitar Novo Link
              </Button>
              
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Voltar ao Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (passwordChanged) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Senha Alterada!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sua senha foi alterada com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-green-200 bg-green-50 mb-4">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Sua senha foi alterada com sucesso. Você será redirecionado para o login em instantes.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Ir para Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Criar Nova Senha
          </CardTitle>
          <CardDescription className="text-gray-600">
            Digite sua nova senha abaixo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {password && (
                <PasswordStrengthIndicator 
                  validation={passwordValidation}
                  showRequirements={true}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {confirmPassword && password !== confirmPassword && (
                <p className="text-sm text-red-600">As senhas não coincidem</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !passwordValidation.isValid || password !== confirmPassword}
            >
              {isLoading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
