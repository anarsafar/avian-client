import { useMutation } from '@tanstack/react-query';

import useUser from '@hooks/store/useUser';
import useCustomToast from '@hooks/custom/useCustomToast';
import useLogout from '@hooks/auth/useLogout';
import usePersist, { StorageType } from '@/hooks/store/usePersist';

import { UserInterface } from '@/schemas/user/user.schema';
import { UpdateUserInterface } from '@/schemas/user/update.schema';

import api, { ErrorResponse, RequestType, SuccessResponse } from '@/api';

const useUserOperations = () => {
  const { getPersistedData } = usePersist();
  const setUser = useUser((state) => state.setUser);
  const toast = useCustomToast();

  const { logoutHandler } = useLogout();

  const token = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );
  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: (data: UpdateUserInterface) => {
      const formData = new FormData();

      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }
      if (data.name) {
        formData.append('name', data.name);
      }
      if (data.username) {
        formData.append('username', data.username);
      }
      if (data.theme) {
        formData.append('theme', data.theme);
      }
      return api<{ user: UserInterface }, FormData>(
        formData,
        'user',
        RequestType.Patch,
        token?.accessToken
      );
    },
    mutationKey: ['update-user'],
    onSuccess: (res) => {
      setUser(res.user);
      toast('success', 'Profile info updated', { message: '' });
    },
    onError: (error: ErrorResponse) =>
      toast('error', 'Profile update fail', error),
    retry: false,
    networkMode: 'always',
  });

  const { mutateAsync: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: () => {
      return api<SuccessResponse, undefined>(
        undefined,
        'user',
        RequestType.Delete,
        token?.accessToken
      );
    },
    mutationKey: ['delete-user'],
    onSuccess: () => logoutHandler(),
    onError: (error: ErrorResponse) =>
      toast('error', 'Account Delete Error', error),
    retry: false,
    networkMode: 'always',
  });

  return {
    updateUser,
    isPending,
    isDeleting,
    deleteUser,
  };
};

export default useUserOperations;
