
import React from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAdminCheck } from '@/hooks/useAdminCheck';

const AdminBadge = () => {
  const { isAdmin, loading } = useAdminCheck();

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <Badge 
      variant="secondary" 
      className="bg-orange-100 text-orange-800 border-orange-200 flex items-center space-x-1"
    >
      <Shield className="h-3 w-3" />
      <span>ADMIN</span>
    </Badge>
  );
};

export default AdminBadge;
