/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import useUser from '@hooks/store/useUser';
import usePersist, { StorageType } from '../store/usePersist';
import api, { ErrorResponse, RequestType } from '@/api';
import { UserInterface } from '@/schemas/user/user.schema';

interface AccessToken {
  accessToken: string;
}

const useAuth = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const { persistData, getPersistedData } = usePersist();
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const [accessToken, setAccessToken] = useState<string | undefined>(() => {
    const token = getPersistedData<AccessToken>(
      'access-token',
      StorageType.Local
    );
    return token?.accessToken;
  });

  const {
    data: userData,
    refetch: getUser,
    isSuccess,
    isError: isUserError,
  } = useQuery({
    queryKey: ['user', accessToken],
    queryFn: () =>
      api<UserInterface, null>(null, 'user', RequestType.Get, accessToken),
    refetchOnWindowFocus: false,
    retry: false,
    networkMode: 'always',
    staleTime: 1000 * 60 * 60 * 5,
  });

  const { mutate: getNewAccessToken, isError } = useMutation({
    mutationFn: (token?: string | undefined) =>
      api<AccessToken, null>(null, 'refresh', RequestType.Post, token),
    mutationKey: ['refresh'],
    onSuccess: (newAccessToken) => {
      persistData<AccessToken>(
        newAccessToken,
        'access-token',
        StorageType.Local
      );
      setAccessToken(newAccessToken.accessToken);
      getUser();
    },
    onError: (error: ErrorResponse) => {
      console.error('Error from refresh route ', error);
    },
    retry: false,
    networkMode: 'always',
  });

  useEffect(() => {
    if (isSuccess && isLoading) {
      setUser(userData);
      setLoading(false);
    } else if (isUserError && isLoading) {
      getNewAccessToken(accessToken);
    } else if (isError) {
      setLoading(false);
    }
  }, [
    accessToken,
    getNewAccessToken,
    isSuccess,
    isUserError,
    setUser,
    isError,
    userData,
    isLoading,
  ]);

  return { user, isLoading, isError, accessToken, getUser };
};

export default useAuth;
