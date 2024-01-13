import { useMutation, useQuery } from '@tanstack/react-query';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useLogout from '@hooks/auth/useLogout';

import { ContactInterface } from '@/utils/contact.interface';
import api, { RequestType } from '@/api';

interface Contacts {
  contacts: ContactInterface[];
}

function useContacts() {
  const { getPersistedData, persistData } = usePersist();
  const { logoutHandler } = useLogout();

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

  const {
    data: contacts,
    isLoading,
    isError,
    refetch: refetchContacts,
  } = useQuery({
    queryKey: ['contacts', accessToken?.accessToken],
    queryFn: () =>
      api<Contacts, null>(
        null,
        'contacts',
        RequestType.Get,
        accessToken?.accessToken
      ),
    enabled: typeof accessToken !== undefined,
    retry: false,
    networkMode: 'always',
  });

  const { mutate: getNewAccessToken } = useMutation({
    mutationFn: (token?: string | undefined) =>
      api<{ accessToken: string }, null>(
        null,
        'refresh',
        RequestType.Post,
        token
      ),
    mutationKey: ['get-new-access-token'],
    onSuccess: (newAccessToken) => {
      persistData<{ accessToken: string }>(
        newAccessToken,
        'access-token',
        StorageType.Local
      );
      refetchContacts();
    },
    onError: () => {
      logoutHandler();
    },
    retry: false,
    networkMode: 'always',
  });

  return { contacts, accessToken, getNewAccessToken, isLoading, isError };
}

export default useContacts;
