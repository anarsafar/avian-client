import * as z from 'zod';

export const ContactModel = z.object({
  _id: z.string(),
  authInfo: z.object({
    providerId: z.string().optional(),
    email: z.string().optional(),
  }),
  userInfo: z.object({
    name: z.string(),
    avatar: z.string(),
    username: z.string(),
  }),
  lastSeen: z.string(),
  online: z.boolean(),
});

const ContactI = z.object({
  user: ContactModel,
  isBlocked: z.boolean(),
  notification: z.boolean(),
});

export type ContactInterface = z.infer<typeof ContactI>;
