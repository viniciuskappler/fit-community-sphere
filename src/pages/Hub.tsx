
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HubLayout from '@/components/hub/HubLayout';
import HubContent from '@/components/hub/HubContent';
import { useHubData } from '@/hooks/useHubData';

const Hub = () => {
  const { user } = useAuth();
  const hubData = useHubData();

  return (
    <HubLayout>
      <HubContent
        user={user}
        {...hubData}
      />
    </HubLayout>
  );
};

export default Hub;
