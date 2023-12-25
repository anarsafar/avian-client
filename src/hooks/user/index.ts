import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';
import { useRef } from 'react';

import api, { RequestType } from '@/api';
import { UserInterface } from '@/schemas/user/user.schema';
import usePersist, { StorageType } from '../common/usePersist';

const emptyObjectSchema = z.object({}).strict();
const isEmpty = (obj: object): boolean => {
  const result = emptyObjectSchema.safeParse(obj);
  return result.success;
};

export const UpdateUserValidate = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required.' })
      .min(3, 'Name must be at least 3 characters long')
      .optional(),
    bio: z
      .string()
      .trim()
      .min(1, { message: 'Bio is required.' })
      .min(3, 'Bio must be at least 3 characters long')
      .optional(),
    phone: z
      .string()
      .trim()
      .min(1, { message: 'Phone is required' })
      .regex(
        // eslint-disable-next-line no-useless-escape
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        'Invalid phone number'
      )
      .default('')
      .optional(),
    avatar: z.unknown().optional(),
    darkMode: z.boolean().optional(),
  })
  .refine((data) => !isEmpty(data), { message: 'Body can not be empty' });

export type UpdateUserInterface = z.infer<typeof UpdateUserValidate>;

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
