import { useQuery } from '@tanstack/react-query';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import api, { RequestType } from '@/api';
import { ConversationInterface } from '@/utils/conversation.interface';

interface ConversationI {
  conversations: ConversationInterface[];
}

const useConversation = () => {
  const { getPersistedData } = usePersist();

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

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

  return { conversations, isLoading, isError, refetchConversations };
};

export default useConversation;
