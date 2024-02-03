/* eslint-disable no-console */
import { useMutation } from '@tanstack/react-query';
import api, { ErrorResponse, RequestType } from '@/api';
import usePersist, { StorageType } from '../store/usePersist';

interface AccessToken {
  accessToken: string;
}

const useToken = (callback: (token: AccessToken) => void) => {
  const { getPersistedData, persistData } = usePersist();

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

  const { mutate: getNewAccessToken, isError } = useMutation({
    mutationFn: () =>
      api<AccessToken, null>(
        null,
        'refresh',
        RequestType.Post,
        accessToken?.accessToken
      ),
    mutationKey: ['refresh'],
    onSuccess: (newAccessToken) => {
      persistData<{ accessToken: string }>(
        newAccessToken,
        'access-token',
        StorageType.Local
      );

      callback(newAccessToken);
    },
    onError: (error: ErrorResponse) => {
      console.error('Error from refresh route ', error);
    },
    retry: false,
    networkMode: 'always',
  });

  return { getNewAccessToken, isError };
};

export default useToken;
