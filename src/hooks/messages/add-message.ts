/* eslint-disable no-console */
import { useMutation } from '@tanstack/react-query';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useActiveConversation from '@hooks/store/useActiveConversation';

import api, { RequestType } from '@/api';
import { MessageI } from '@/schemas/message';
import useInfiniteMessages from '.';

interface MessageBody {
  message: {
    messageBody: string;
    timeStamp: Date;
  };
  chatId: string | undefined;
  senderId: string | undefined;
  recipientId: string | undefined;
}

const useAddMessage = () => {
  const { getPersistedData } = usePersist();
  const { activeConversation } = useActiveConversation();

  const { refetchMessages } = useInfiniteMessages(activeConversation?._id);

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );

  const {
    mutateAsync: addMessage,
    isPending: messagePending,
    error: errorMessage,
  } = useMutation({
    mutationFn: (message: MessageBody) => {
      return api<MessageI, MessageBody>(
        message,
        'messages',
        RequestType.Post,
        accessToken?.accessToken
      );
    },
    mutationKey: ['add-message'],
    onSuccess: (data) => {
      console.log(data);
      refetchMessages();
    },
    onError: (error, variables) => {
      console.log(error);
      console.log(variables);
      // todo save message to storage and add messsage to message store after that add effect hook to save message on reconnection
    },
    retry: false,
    networkMode: 'always',
  });

  return { addMessage, messagePending, errorMessage };
};

export default useAddMessage;
