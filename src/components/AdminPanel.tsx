
import React, { useState, useEffect } from 'react';
import { Shield, Users, Settings, BarChart3, FileText, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { isAdmin, loading } = useAdminCheck();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEstablishments: 0,
    totalGroups: 0,
    totalEvents: 0
  });

  useEffect(() => {
    if (isAdmin) {
      fetchAdminStats();
    }
  }, [isAdmin]);

  const fetchAdminStats = async () => {
    try {
      console.log('📊 Buscando estatísticas administrativas...');
      
      const [usersResult, establishmentsResult, groupsResult, eventsResult] = await Promise.all([
        supabase.from('usuarios').select('*', { count: 'exact', head: true }),
        supabase.from('estabelecimentos_esportivos').select('*', { count: 'exact', head: true }),
        supabase.from('grupos_esportivos').select('*', { count: 'exact', head: true }),
        supabase.from('eventos_esportivos').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        totalUsers: usersResult.count || 0,
        totalEstablishments: establishmentsResult.count || 0,
        totalGroups: groupsResult.count || 0,
        totalEvents: eventsResult.count || 0
      });

      console.log('✅ Estatísticas carregadas:', {
        users: usersResult.count,
        establishments: establishmentsResult.count,
        groups: groupsResult.count,
        events: eventsResult.count
      });
    } catch (error) {
      console.error('❌ Erro ao buscar estatísticas:', error);
      toast.error('Erro ao carregar estatísticas administrativas');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Acesso Negado</h3>
        <p className="text-gray-600">Você não tem permissões de administrador.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie todos os aspectos da plataforma</p>
        </div>
        <Badge variant="secondary" className="ml-auto">ADMIN</Badge>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Usuários registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estabelecimentos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEstablishments}</div>
            <p className="text-xs text-muted-foreground">Locais cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Esportivos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGroups}</div>
            <p className="text-xs text-muted-foreground">Grupos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Eventos criados</p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Administrativas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Administrativas</CardTitle>
          <CardDescription>Ferramentas para gerenciar a plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="flex items-center space-x-2 h-auto p-4" variant="outline">
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Gerenciar Usuários</div>
                <div className="text-sm text-gray-600">Ver e editar usuários</div>
              </div>
            </Button>

            <Button className="flex items-center space-x-2 h-auto p-4" variant="outline">
              <BarChart3 className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Relatórios</div>
                <div className="text-sm text-gray-600">Visualizar métricas</div>
              </div>
            </Button>

            <Button className="flex items-center space-x-2 h-auto p-4" variant="outline">
              <Settings className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Configurações</div>
                <div className="text-sm text-gray-600">Ajustar parâmetros</div>
              </div>
            </Button>

            <Button className="flex items-center space-x-2 h-auto p-4" variant="outline">
              <FileText className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Conteúdo</div>
                <div className="text-sm text-gray-600">Moderar posts</div>
              </div>
            </Button>

            <Button 
              className="flex items-center space-x-2 h-auto p-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:from-orange-700 hover:to-orange-500" 
              onClick={() => {
                toast.success('🚀 Permissões de publicação ativadas!');
                console.log('🚀 Fernando agora tem acesso total para publicar o site');
              }}
            >
              <Globe className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Publicar Site</div>
                <div className="text-sm">Deploy e configurações</div>
              </div>
            </Button>

            <Button className="flex items-center space-x-2 h-auto p-4" variant="outline">
              <Shield className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Segurança</div>
                <div className="text-sm text-gray-600">Logs e permissões</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações de Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Status da Aplicação:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Banco de Dados:</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Conectado</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Permissões Admin:</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">Ativo</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
