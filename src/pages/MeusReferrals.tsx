import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift, Trophy, Users, TrendingUp, ArrowLeft, Share2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import SecondaryHeader from '@/components/SecondaryHeader';
import Footer from '@/components/Footer';

const MeusReferrals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const referralCode = user?.id ? `NUCLEO${user.id.slice(0, 8).toUpperCase()}` : '';
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: 'Link copiado!',
      description: 'O link de referral foi copiado para sua área de transferência.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Núcleo do Esporte',
          text: 'Junte-se ao Núcleo do Esporte e descubra oportunidades esportivas incríveis!',
          url: referralLink,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const mockStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalRewards: 350,
    currentLevel: 'Bronze',
    nextLevel: 'Prata',
    progressToNext: 65
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SecondaryHeader isVisible={false} />
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Meus Referrals</h1>
                <p className="text-muted-foreground">Convide amigos e ganhe recompensas incríveis</p>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Seu Link de Referral</CardTitle>
                <CardDescription>Compartilhe com seus amigos e ganhe recompensas</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Input value={referralLink} readOnly className="bg-gray-100 cursor-pointer" onClick={handleCopyLink} />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyLink}
                    disabled={copied}
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </Button>
                </div>
                <Button className="w-full" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Estatísticas</CardTitle>
                <CardDescription>Acompanhe seu progresso</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Total de Referrals</div>
                    <div className="text-2xl font-bold">{mockStats.totalReferrals}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Referrals Ativos</div>
                    <div className="text-2xl font-bold">{mockStats.activeReferrals}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Recompensas Totais</div>
                  <div className="text-2xl font-bold flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-yellow-500" />
                    {mockStats.totalRewards}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Seu Nível</div>
                  <div className="text-2xl font-bold flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    {mockStats.currentLevel}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Próximo Nível</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-medium">{mockStats.nextLevel}</div>
                    <Badge variant="secondary">+50% de recompensas</Badge>
                  </div>
                  <progress value={mockStats.progressToNext} max="100" className="w-full h-2 rounded-full bg-gray-200"></progress>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeusReferrals;
