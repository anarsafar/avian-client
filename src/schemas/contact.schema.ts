import * as z from 'zod';

export const ValidateContact = z.object({
  contact: z
    .string()
    .refine(
      (value) => {
        const isEmail = /\S+@\S+\.\S+/.test(value);
        const isNonEmptyString =
          typeof value === 'string' && value.trim().length > 0;

        return isEmail || isNonEmptyString;
      },
      {
        message: 'Please enter a valid email or username',
      }
    )
    .refine((contact) => contact.toLowerCase()),
});

export type ValidateContactType = z.infer<typeof ValidateContact>;
