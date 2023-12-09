/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import usePersist, { StorageType } from './usePersist';
import api, { ErrorResponse, RequestType } from '@/api';
import { UserInterface } from '@/schemas/user.schema';

interface AccessToken {
  accessToken: string;
}
const useAuth = () => {
  const { persistData, getPersistedData } = usePersist();

  const [userData, setUserData] = useState<UserInterface | undefined>(() => {
    const cachedUser = getPersistedData<UserInterface>(
      'user',
      StorageType.Local
    );
    return cachedUser;
  });
  const [accessToken] = useState<string | undefined>(() => {
    const token = getPersistedData<AccessToken>(
      'access-token',
      StorageType.Local
    );
    return token?.accessToken;
  });
  const [isLoading, setLoading] = useState<boolean>(true);

  const { mutate: getUser } = useMutation({
    mutationFn: (token: string) =>
      api<UserInterface, null>(null, 'user', RequestType.Get, token),
    mutationKey: ['get-user'],
    onSuccess: (response) => {
      persistData<UserInterface>(response, 'user', StorageType.Local);
      setLoading(false);
      setUserData(response);
    },
    onError: (error: ErrorResponse, token) => {
      console.log('Error from get user ', error);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getNewAccessToken(token);
    },
    retry: false,
    networkMode: 'always',
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
      getUser(newAccessToken.accessToken);
    },
    onError: (error: ErrorResponse) => {
      console.error('Error from refresh route ', error);
      setLoading(false);
    },
    retry: false,
    networkMode: 'always',
  });

  useEffect(() => {
    if (accessToken) {
      getUser(accessToken);
    } else {
      getNewAccessToken('');
    }
  }, [getUser, getNewAccessToken, accessToken]);

  return { user: userData, isLoading, isError, accessToken };
};

export default useAuth;
