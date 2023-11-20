import * as z from 'zod';

export const LoginValidate = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email('Email is not a valid.')
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(8, 'Password must be at least 8 characters in length')
    .regex(/.*[A-Z].*/, 'Password must include one uppercase character')
    .regex(/.*[a-z].*/, 'Password must include one lowercase character')
    .regex(/.*\d.*/, 'Password must include one number')
    .regex(/[!@#$%^&*()]/, 'Password must include one special character'),
});

export type LoginInterface = z.infer<typeof LoginValidate>;

export const SignupValidate = LoginValidate.extend({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .min(3, 'Name must be at least 3 characters long'),
  confirmPassword: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignupInterface = z.infer<typeof SignupValidate>;
