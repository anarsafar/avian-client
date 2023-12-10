import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

const useLogout = () => {
  const navigate = useNavigate();

  const { mutateAsync: logOut } = useMutation({
    mutationFn: (token: string | undefined) =>
      api<SuccessResponse, undefined>(
        undefined,
        'auth/logout',
        RequestType.Post,
        token
      ),
    mutationKey: ['logout'],
    onError: (error: ErrorResponse) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
    retry: false,
    networkMode: 'always',
  });

  const logoutHandler = (accessToken: string | undefined) => {
    logOut(accessToken);
    localStorage.clear();
    navigate('/auth/signin');
  };

  return { logoutHandler };
};

export default useLogout;