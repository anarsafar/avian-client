import { useInfiniteQuery } from '@tanstack/react-query';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import api, { RequestType } from '@/api';
import { MessageResponse } from '@/schemas/message';

const useInfiniteMessages = (conversationId: string | undefined) => {
  const { getPersistedData } = usePersist();

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
    refetch: refetchMessages,
  } = useInfiniteQuery({
    queryKey: ['messages', accessToken?.accessToken, conversationId],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await api<MessageResponse, null>(
        null,
        `messages/${conversationId}?page=${pageParam}`,
        RequestType.Get,
        accessToken?.accessToken
      );
      return data;
    },
    initialPageParam: 1,
    enabled: !!accessToken && conversationId !== undefined,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.pagination.page > 1 ? firstPage.pagination.page - 1 : undefined,
  });

  return {
    messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchMessages,
    isFetching,
    isError,
    error,
  };
};

export default useInfiniteMessages;
