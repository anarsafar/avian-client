import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/auth/useAuth';
import useLogout from '@/hooks/auth/useLogout';
import { RouteLoading } from '@/components/loading';

interface ComponentProps {
  element: ReactNode;
}

function Protected({ element }: ComponentProps): ReactNode {
  const { user, isLoading, isError, accessToken } = useAuth();
  const navigate = useNavigate();
  const { logoutHandler } = useLogout();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth/signin');
    }
    if (isError) {
      logoutHandler();
    }
  }, [isLoading, user, navigate, isError, accessToken, logoutHandler]);

  if (user) {
    return element;
  }

  if (isLoading) {
    return <RouteLoading />;
  }
}

export default Protected;
