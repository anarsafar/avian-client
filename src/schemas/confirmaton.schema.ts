import * as z from 'zod';

export const ConfrimationValidate = z.object({
  confirmationCode: z.string().refine((code) => /^[a-zA-Z0-9]{6}$/.test(code)),
  confirmationType: z.union([z.literal('email'), z.literal('password')]),
});

export type ConfirmationInterface = z.infer<typeof ConfrimationValidate>;

export const EmailValidate = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email('Email is not a valid.')
    .transform((email) => email.toLowerCase()),
});

export type EmailValidateInterface = z.infer<typeof EmailValidate>;
