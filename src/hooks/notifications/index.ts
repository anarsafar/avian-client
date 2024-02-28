import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';

import usePersist, { StorageType } from '@hooks/store/usePersist';
import useUser from '@hooks/store/useUser';
import useCustomToast from '@hooks/custom/useCustomToast';
import useContacts from '@hooks/contact/useContacts';

import api, { RequestType, SuccessResponse } from '@/api';
import { UserInterface } from '@/schemas/user/user.schema';

export const ValidateNotifaction = z.object({
  type: z.union([z.literal('reset'), z.literal('login'), z.literal('group')]),
  osInfo: z.string().min(1, 'OS info required'),
  location: z
    .object({
      latitude: z.number().min(1, 'latitude is required'),
      longitude: z.number().min(1, 'ongitude is required'),
    })
    .optional(),
  browserInfo: z.string(),
});

export type ValidateNotifactionI = z.infer<typeof ValidateNotifaction>;

const useNotifications = () => {
  const { getPersistedData } = usePersist();
  const toast = useCustomToast();
  const { refetchContacts } = useContacts();

  const accessToken = getPersistedData<{ accessToken: string }>(
    'access-token',
    StorageType.Local
  );
  const { setUser } = useUser();

  const {
    mutateAsync: addNotification,
    isPending: isAddingNotificationPending,
  } = useMutation({
    mutationFn: ({
      notification,
      searchParam,
    }: {
      notification: ValidateNotifactionI;
      searchParam: string;
    }) =>
      api<SuccessResponse, ValidateNotifactionI>(
        notification,
        `notifications/${searchParam}`,
        RequestType.Post
      ),
    mutationKey: ['add-notification'],
    retry: false,
    networkMode: 'always',
  });

  const { mutateAsync: changeNotification, isPending: notificationPending } =
    useMutation({
      mutationFn: (contactId?: string) => {
        const URI =
          contactId && contactId.length > 0
            ? `notifications/contact/${contactId}`
            : `notifications/profile`;

        return api<{ user: UserInterface }, null>(
          null,
          URI,
          RequestType.Post,
          accessToken?.accessToken
        );
      },
      mutationKey: ['notification'],
      onSuccess: (data, variables) => {
        if (variables && variables?.length > 0) {
          refetchContacts();
        } else {
          setUser(data.user);
        }
      },
      onError: (error) => toast('error', 'Notificaation error', error),
      retry: false,
      networkMode: 'always',
    });

  return {
    addNotification,
    isAddingNotificationPending,
    changeNotification,
    notificationPending,
  };
};

export default useNotifications;
