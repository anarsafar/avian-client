import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import usePersist, { StorageType } from '@/hooks/store/usePersist';
import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import useActiveConversation from '../store/useActiveConversation';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getPersistedData } = usePersist();
  const { clearActiveConversation } = useActiveConversation();
  const token = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );
  const { mutateAsync: logOut } = useMutation({
    mutationFn: () => {
      return api<SuccessResponse, undefined>(
        undefined,
        'auth/logout',
        RequestType.Post,
        token?.accessToken
      );
    },
    mutationKey: ['logout'],
    onError: (error: ErrorResponse) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
    retry: false,
    networkMode: 'always',
  });

  const logoutHandler = () => {
    logOut();
    localStorage.clear();
    sessionStorage.clear();
    queryClient.clear();
    clearActiveConversation();
    navigate('/auth/signin');
  };

  return { logoutHandler };
};

export default useLogout;
