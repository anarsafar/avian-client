import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

import usePersist, { StorageType } from '@/hooks/store/usePersist';
import api, { RequestType } from '@/api';
import { UserInterface } from '@/schemas/user/user.schema';
import { UpdateUserInterface } from '@/schemas/user/update.schema';

const useUser = () => {
  const { getPersistedData } = usePersist();
  const { current: token } = useRef(
    getPersistedData<{ accessToken: string }>('access-token', StorageType.Local)
  );

  const { mutate: updateUser, isSuccess } = useMutation({
    mutationFn: (data: UpdateUserInterface) =>
      api<UserInterface, UpdateUserInterface>(
        data,
        'user',
        RequestType.Patch,
        token?.accessToken
      ),
    mutationKey: ['update-user'],
    networkMode: 'always',
    retry: false,
  });

  return { updateUser, isSuccess };
};

export default useUser;
