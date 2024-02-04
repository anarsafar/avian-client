import * as z from 'zod';

export const ValidateContact = z.object({
  contact: z
    .string()
    .trim()
    .min(1, { message: 'provide username or email' })
    .min(3, { message: 'invalid username' })
    .refine(
      (value) => {
        const isEmail = /\S+@\S+\.\S+/.test(value);
        const isUserName =
          typeof value === 'string' &&
          value.trim().length > 0 &&
          /^[a-z0-9_]+$/.test(value);

        if (value.includes('@')) {
          return isEmail;
        }

        return isUserName;
      },
      {
        message: 'Please enter a valid email or username',
      }
    )
    .refine((contact) => contact.toLowerCase()),
});

export type ValidateContactType = z.infer<typeof ValidateContact>;
