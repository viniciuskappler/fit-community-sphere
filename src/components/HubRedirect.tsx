import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HubRedirectProps {
  tab: string;
}

const HubRedirect = ({ tab }: HubRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/hub?tab=${tab}`, { replace: true });
  }, [navigate, tab]);

  return null;
};

export default HubRedirect;