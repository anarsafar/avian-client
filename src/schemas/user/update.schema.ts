import * as z from 'zod';

const emptyObjectSchema = z.object({}).strict();
const isEmpty = (obj: object): boolean => {
  const result = emptyObjectSchema.safeParse(obj);
  return result.success;
};

const fileSchema = z.lazy(() => z.instanceof(File));

export const UpdateUserValidate = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required.' })
      .min(3, 'Name must be at least 3 characters long')
      .optional(),
    avatar: z.string().nullable().or(fileSchema.nullable()).optional(),
    darkMode: z.boolean().optional(),
    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters long')
      .refine((value) => /^[a-z0-9_]+$/.test(value), {
        message:
          'Username must contain only lowercase letters, numbers, and underscores.',
      })
      .optional(),
  })
  .refine((data) => !isEmpty(data), { message: 'Body can not be empty' });

export type UpdateUserInterface = z.infer<typeof UpdateUserValidate>;
