import * as z from 'zod';
import { ContactModel } from './contact.interface';

const objectId = z.string().refine((value) => /^[a-f\d]{24}$/i.test(value), {
  message: 'Invalid ObjectId format',
});

const ConversationI = z.object({
  _id: objectId,
  participants: z.array(ContactModel),
  type: z.union([z.literal('private'), z.literal('group')]).default('private'),
  conversationName: z.string().optional(),
  conversationCover: z.string().optional(),
  messages: z.array(objectId).default([]),
  admin: objectId.optional(),
});

export type ConversationInterface = z.infer<typeof ConversationI>;
