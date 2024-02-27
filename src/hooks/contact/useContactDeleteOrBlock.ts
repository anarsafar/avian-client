/* eslint-disable no-underscore-dangle */
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useCustomToast from '@/hooks/custom/useCustomToast';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

interface Action {
  action: 'block' | 'delete';
}

function useContactDeleteOrBlock(contactId: string, onClose?: () => void) {
  const toast = useCustomToast();
  const { getPersistedData } = usePersist();
  const queryClient = useQueryClient();
  const { current: accessToken } = useRef(
    getPersistedData<{ accessToken: string }>('access-token', StorageType.Local)
  );

  const {
    mutateAsync: deleteOrBlockContact,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (action: Action) =>
      api<SuccessResponse, Action>(
        action,
        `contacts/${contactId}`,
        RequestType.Post,
        accessToken?.accessToken
      ),
    mutationKey: ['block-or-delete-contact'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      if (onClose) {
        onClose();
      }
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

  return { deleteOrBlockContact, isPending, isError };
}

export default useContactDeleteOrBlock;
