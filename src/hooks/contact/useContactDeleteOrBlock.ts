/* eslint-disable no-underscore-dangle */
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useActiveConversation from '@hooks/store/useActiveConversation';
import usePersist, { StorageType } from '@hooks/store/usePersist';
import useCustomToast from '@/hooks/custom/useCustomToast';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

interface Action {
  action: 'block' | 'delete';
}

function useContactDeleteOrBlock(contactId: string) {
  const { activeConversation, setActiveConversation, clearActiveConversation } =
    useActiveConversation();

  const toast = useCustomToast();
  const { getPersistedData } = usePersist();
  const queryClient = useQueryClient();
  const { current: accessToken } = useRef(
    getPersistedData<{ accessToken: string }>('access-token', StorageType.Local)
  );

  const { mutateAsync: deleteOrBlockContact, isPending } = useMutation({
    mutationFn: (action: Action) =>
      api<SuccessResponse, Action>(
        action,
        `contacts/${contactId}`,
        RequestType.Post,
        accessToken?.accessToken
      ),
    mutationKey: ['block-or-delete-contact'],
    onSuccess: (res, variables) => {
      if (contactId === activeConversation?.user._id) {
        if (variables.action === 'block') {
          const newActiveConvesation = {
            ...activeConversation,
            isBlocked: !activeConversation.isBlocked,
          };
          setActiveConversation(newActiveConvesation);
        } else {
          clearActiveConversation();
        }
      }
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
    onError: (error: ErrorResponse, variables: Action) =>
      toast(
        'error',
        `Error ${
          variables.action === 'block' ? 'blocking' : 'deleting'
        } contact`,
        error
      ),
    retry: false,
    networkMode: 'always',
  });

  return { deleteOrBlockContact, isPending };
}

export default useContactDeleteOrBlock;
