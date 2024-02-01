/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useLogout from '@hooks/auth/useLogout';
import useActiveContact from '@hooks/store/useActiveContact';

import { ContactInterface } from '@/utils/contact.interface';
import api, { RequestType } from '@/api';
import { useSocket } from '@/context/socket.context';

interface Contacts {
  contacts: ContactInterface[];
}

function useContacts() {
  const { getPersistedData, persistData } = usePersist();
  const { activeContact, setActiveContact } = useActiveContact();

  const socket = useSocket();
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

  useEffect(() => {
    socket?.on('refreshData', (userId: string) => {
      const user = contacts?.contacts.find(
        (contact) => contact.user._id === userId
      );
      if (user) {
        refetchContacts();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (activeContact && contacts) {
      const newActiveContact = contacts?.contacts.find(
        (contact) => contact.user._id === activeContact?.user._id
      );
      if (newActiveContact) {
        setActiveContact(newActiveContact);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  return { contacts, accessToken, getNewAccessToken, isLoading, isError };
}

export default useContacts;
