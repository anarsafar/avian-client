import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';

import api, { RequestType, SuccessResponse } from '@/api';

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

  return {
    addNotification,
    isAddingNotificationPending,
  };
};

export default useNotifications;
