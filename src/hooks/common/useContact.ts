import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useCustomToast from '@/components/common/CustomToast';
import usePersist, { StorageType } from './usePersist';
import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

interface Action {
  action: 'block' | 'delete';
}

function useContact(contactId: string) {
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contacts'] }),
    onError: (error: ErrorResponse, variables: Action) =>
      toast(
        true,
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

export default useContact;
