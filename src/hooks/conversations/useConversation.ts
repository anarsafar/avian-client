import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useActiveContact from '@hooks/store/useActiveContact';
import useCustomToast from '@hooks/custom/useCustomToast';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';
import { ConversationInterface } from '@/utils/conversation.interface';
import { useSocket } from '@/context/socket.context';
import useActiveConversation from '../store/useActiveConversation';

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
  const { setActiveContact, activeContact, clearActiveContact } =
    useActiveContact();
  const { clearConversation } = useActiveConversation();
  const toast = useCustomToast();

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

  const { mutate: deleteConversation, isPending: isConversationDeleting } =
    useMutation({
      mutationFn: (conversationId: string) =>
        api<SuccessResponse, null>(
          null,
          `conversations/${conversationId}`,
          RequestType.Delete,
          accessToken?.accessToken
        ),
      mutationKey: ['delete-conversation'],
      onSuccess: (message) => {
        clearActiveContact();
        clearConversation();

        toast('success', 'Conversation deleted', message);
        refetchConversations();
      },
      onError: (error: ErrorResponse) =>
        toast('error', "Conversation couldn't deleted", error),
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

  return {
    conversations,
    isLoading,
    isError,
    refetchConversations,
    deleteConversation,
    isConversationDeleting,
  };
};

export default useConversation;
