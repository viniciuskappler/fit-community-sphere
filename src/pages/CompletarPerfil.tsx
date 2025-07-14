
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCPF } from '@/utils/cpfValidation';
import { useCities } from '@/hooks/useCities';
import { toast } from 'sonner';

const CompletarPerfil = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { states, cities, loadCities } = useCities();
  
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    phone: '',
    email: user?.email || '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    state: '',
    city: '',
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setFormData(prev => ({ ...prev, cpf: formatCPF(value) }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      let formattedPhone = value;
      if (value.length >= 10) {
        formattedPhone = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 6) {
        formattedPhone = value.replace(/(\d{2})(\d{4})/, '($1) $2');
      } else if (value.length >= 2) {
        formattedPhone = value.replace(/(\d{2})/, '($1) ');
      }
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
    }
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      const formattedCEP = value.replace(/(\d{5})(\d{3})/, '$1-$2');
      setFormData(prev => ({ ...prev, cep: formattedCEP }));
    }
  };

  const handleStateChange = (value: string) => {
    setFormData(prev => ({ ...prev, state: value, city: '' }));
    loadCities(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Construir data de nascimento
      const birthDate = `${formData.birthYear}-${formData.birthMonth.padStart(2, '0')}-${formData.birthDay.padStart(2, '0')}`;
      
      // Atualizar perfil do usuário
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          cpf: formData.cpf,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          street: formData.street,
          number: formData.number,
          neighborhood: formData.neighborhood,
          cep: formData.cep,
          birth_date: birthDate,
          promo_code: 'SQUAD300'
        });

      if (profileError) throw profileError;

      // Verificar/criar registro na tabela usuarios
      const { data: existingUser } = await supabase
        .from('usuarios')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingUser) {
        const { error: usuarioError } = await supabase
          .from('usuarios')
          .insert({
            id: user.id,
            code: 'SQUAD300',
            name: formData.fullName,
            city: formData.city,
            sport: ''
          });

        if (usuarioError) throw usuarioError;
      }

      toast.success('Perfil completado com sucesso!');
      navigate('/hub');
      
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      toast.error('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Arrays para dias, meses e anos
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete seu perfil
            </h1>
            <p className="text-gray-600">
              Precisamos de algumas informações para finalizar seu cadastro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome completo */}
            <div>
              <Label className="text-orange-600 font-medium">Nome completo *</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Seu nome completo"
                required
                className="mt-1 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* CPF e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-orange-600 font-medium">CPF *</Label>
                <Input
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  placeholder="000.000.000-00"
                  required
                  maxLength={14}
                  className="mt-1 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <Label className="text-orange-600 font-medium">Telefone *</Label>
                <Input
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  required
                  className="mt-1 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <Label className="text-orange-600 font-medium">E-mail *</Label>
              <Input
                value={formData.email}
                disabled
                className="mt-1 bg-gray-100"
              />
            </div>

            {/* Endereço Completo */}
            <div>
              <Label className="text-orange-600 font-medium">Endereço Completo *</Label>
              
              {/* CEP */}
              <div className="mt-2">
                <Input
                  value={formData.cep}
                  onChange={handleCEPChange}
                  placeholder="CEP"
                  maxLength={9}
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* Rua e Número */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  value={formData.street}
                  onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="Rua/Avenida"
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
                <Input
                  value={formData.number}
                  onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="Número"
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              {/* Bairro */}
              <div className="mt-4">
                <Input
                  value={formData.neighborhood}
                  onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                  placeholder="Bairro"
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Estado e Cidade */}
            <div>
              <Label className="text-orange-600 font-medium">Estado e Cidade *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Select value={formData.state} onValueChange={handleStateChange}>
                  <SelectTrigger className="focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Digite o nome da cidade"
                  className="focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Data de Nascimento */}
            <div>
              <Label className="text-orange-600 font-medium">Data de Nascimento *</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <Select value={formData.birthDay} onValueChange={(value) => setFormData(prev => ({ ...prev, birthDay: value }))}>
                  <SelectTrigger className="focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={formData.birthMonth} onValueChange={(value) => setFormData(prev => ({ ...prev, birthMonth: value }))}>
                  <SelectTrigger className="focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Mês" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={formData.birthYear} onValueChange={(value) => setFormData(prev => ({ ...prev, birthYear: value }))}>
                  <SelectTrigger className="focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 text-lg font-semibold"
            >
              {loading ? 'Salvando...' : 'Finalizar Cadastro'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompletarPerfil;
