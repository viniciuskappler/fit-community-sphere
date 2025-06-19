
import React, { useState } from 'react';
import { Copy, DollarSign, Users, TrendingUp, Calendar, CheckCircle, Clock, X } from 'lucide-react';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useReferralTracking } from '@/hooks/useReferralTracking';
import { useToast } from '@/hooks/use-toast';

const MeusReferrals = () => {
  const { user } = useAuth();
  const { 
    referralCodes, 
    conversions, 
    loading, 
    generateReferralCode, 
    getTotalCommissions, 
    getPaidCommissions, 
    getPendingCommissions 
  } = useReferralTracking();
  const { toast } = useToast();
  const [generatingCode, setGeneratingCode] = useState<string | null>(null);

  const handleGenerateCode = async (type: 'establishment' | 'group' | 'supporter') => {
    setGeneratingCode(type);
    const { error } = await generateReferralCode(type);
    
    if (error) {
      toast({
        title: "Erro",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Código de referral gerado com sucesso!"
      });
    }
    
    setGeneratingCode(null);
  };

  const copyToClipboard = (code: string, type: string) => {
    const baseUrl = window.location.origin;
    let url = '';
    
    switch (type) {
      case 'establishment':
        url = `${baseUrl}/landing/estabelecimento/${code}`;
        break;
      case 'group':
        url = `${baseUrl}/landing/grupo/${code}`;
        break;
      default:
        url = `${baseUrl}/?ref=${code}`;
    }
    
    navigator.clipboard.writeText(url);
    toast({
      title: "Copiado!",
      description: "Link de referral copiado para a área de transferência"
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader isVisible={true} />
        <Header isSecondaryVisible={true} />
        <main className="pt-[120px] px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando seus referrals...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader isVisible={true} />
      <Header isSecondaryVisible={true} />
      
      <main className="pt-[120px] px-4 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2">
              Meus Referrals
            </h1>
            <p className="text-gray-600">
              Acompanhe suas indicações e comissões ganhas
            </p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700 text-sm">
                  <DollarSign size={16} />
                  Total Ganho
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-800">
                  {formatCurrency(getTotalCommissions())}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-700 text-sm">
                  <CheckCircle size={16} />
                  Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-800">
                  {formatCurrency(getPaidCommissions())}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-yellow-700 text-sm">
                  <Clock size={16} />
                  Pendente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-800">
                  {formatCurrency(getPendingCommissions())}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-700 text-sm">
                  <Users size={16} />
                  Indicações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-800">
                  {conversions.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Códigos de Referral */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Seus Códigos de Referral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button
                  onClick={() => handleGenerateCode('establishment')}
                  disabled={generatingCode === 'establishment'}
                  className="bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500"
                >
                  {generatingCode === 'establishment' ? 'Gerando...' : 'Gerar Código Estabelecimento'}
                </Button>
                <Button
                  onClick={() => handleGenerateCode('group')}
                  disabled={generatingCode === 'group'}
                  className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500"
                >
                  {generatingCode === 'group' ? 'Gerando...' : 'Gerar Código Grupo'}
                </Button>
                <Button
                  onClick={() => handleGenerateCode('supporter')}
                  disabled={generatingCode === 'supporter'}
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                >
                  {generatingCode === 'supporter' ? 'Gerando...' : 'Gerar Código Praticante'}
                </Button>
              </div>

              <div className="space-y-3">
                {referralCodes.map((code) => (
                  <div key={code.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="capitalize">
                        {code.type === 'establishment' ? 'Estabelecimento' : 
                         code.type === 'group' ? 'Grupo' : 'Praticante'}
                      </Badge>
                      <span className="font-mono font-bold text-lg">{code.code}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(code.code, code.type)}
                      className="flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Copiar Link
                    </Button>
                  </div>
                ))}
                
                {referralCodes.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Você ainda não gerou nenhum código de referral. Clique nos botões acima para começar!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Conversões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Histórico de Conversões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversions.map((conversion) => (
                  <div key={conversion.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(conversion.commission_status)}
                      <div>
                        <p className="font-medium">
                          Cadastro {conversion.conversion_type === 'establishment' ? 'Estabelecimento' : 
                                   conversion.conversion_type === 'group' ? 'Grupo' : 'Praticante'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Código: {conversion.referral_code.code} • {' '}
                          {new Date(conversion.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatCurrency(conversion.commission_amount)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getStatusText(conversion.commission_status)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {conversions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    Ainda não há conversões registradas. Compartilhe seus códigos para começar a ganhar comissões!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeusReferrals;
