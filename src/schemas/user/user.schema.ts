import * as z from 'zod';

const localAuthInfo = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email('Email is not a valid.')
    .transform((email) => email.toLowerCase()),
  password: z.string().min(1, { message: 'Password is required.' }),
  confirmationCode: z
    .string()
    .min(1, 'confirmation code is required')
    .max(6, 'confirmation code length exceeded')
    .length(6, 'confirmation code must be 6 digits long')
    .refine((code) => /^[a-zA-Z0-9]{6}$/.test(code)),
  confirmed: z.boolean().default(false),
  confirmationTimestamp: z.date().optional(),
});

const socialAuthInfo = z.object({
  provider: z.union([
    z.literal('google'),
    z.literal('facebook'),
    z.literal('github'),
  ]),
  providerId: z.string().min(1, 'Provider id is required'),
});

export const UserZodSchema = z.object({
  _id: z.string(),
  authType: z.union([z.literal('local'), z.literal('social')]),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authInfo: z.custom((data: any) => {
    if (data.authType === 'local') {
      return localAuthInfo.parse(data);
    }
    return socialAuthInfo.parse(data);
  }),

  userInfo: z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required.' })
      .min(3, 'Name must be at least 3 characters long')
      .refine((value) => /^[A-Za-z]+$/.test(value), {
        message: 'Name must contain only letters',
      }),
    bio: z
      .string()
      .trim()
      .min(1, { message: 'Bio is required.' })
      .min(3, 'Bio must be at least 3 characters long')
      .default('')
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
      .optional(),
    avatar: z.string().optional(),
    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters long')
      .refine((value) => /^[a-z0-9_]+$/.test(value), {
        message:
          'Username must contain only lowercase letters, numbers, and underscores.',
      }),
  }),

  resetPassword: z
    .object({
      confirmationCode: z
        .string()
        .min(1, 'confirmation code is required')
        .max(6, 'confirmation code length exceeded')
        .length(6, 'confirmation code must be 6 digits long')
        .refine((code) => /^[a-zA-Z0-9]{6}$/.test(code)),
      confirmed: z.boolean().default(false),
      confirmationTimestamp: z.date().optional(),
    })
    .optional(),

  preferences: z
    .object({
      theme: z.union([z.literal('os'), z.literal('light'), z.literal('dark')]),
    })
    .optional(),
});

export type UserInterface = z.infer<typeof UserZodSchema>;
