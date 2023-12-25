import * as z from 'zod';

export const EmailValidate = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email('Email is not a valid.')
    .transform((email) => email.toLowerCase()),
});

export type EmailValidateInterface = z.infer<typeof EmailValidate>;

export const PasswordValidate = EmailValidate.extend({
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required.' })
    .min(8, 'Password must be at least 8 characters in length')
    .regex(/.*[A-Z].*/, 'Password must include one uppercase character')
    .regex(/.*[a-z].*/, 'Password must include one lowercase character')
    .regex(/.*\d.*/, 'Password must include one number')
    .regex(/[!@#$%^&*()]/, 'Password must include one special character'),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: 'confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type PasswordValidateInterface = z.infer<typeof PasswordValidate>;
