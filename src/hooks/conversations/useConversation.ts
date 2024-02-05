import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useActiveContact from '@hooks/store/useActiveContact';

import api, { RequestType } from '@/api';
import { ConversationInterface } from '@/utils/conversation.interface';
import { useSocket } from '@/context/socket.context';

interface ConversationI {
  conversations: ConversationInterface[];
}

const useConversation = () => {
  const { getPersistedData } = usePersist();
  const socket = useSocket();
  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );
  const { setActiveContact, activeContact } = useActiveContact();

  const {
    data: conversations,
    isLoading,
    isError,
    refetch: refetchConversations,
  } = useQuery({
    queryKey: ['conversations', accessToken?.accessToken],
    queryFn: () =>
      api<ConversationI, null>(
        null,
        'conversations',
        RequestType.Get,
        accessToken?.accessToken
      ),
    enabled: typeof accessToken !== undefined,
    retry: false,
    networkMode: 'always',
  });

  useEffect(() => {
    socket?.on('refreshData', () => {
      refetchConversations();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (activeContact) {
      conversations?.conversations.forEach((chat) => {
        const newActiveContact = chat.participants.find(
          (user) => user._id === activeContact.user._id
        );
        if (newActiveContact) {
          setActiveContact({ user: newActiveContact, isBlocked: false });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  return { conversations, isLoading, isError, refetchConversations };
};

export default useConversation;
