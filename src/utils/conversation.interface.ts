import * as z from 'zod';
import { ContactModel } from './contact.interface';

const objectId = z.string().refine((value) => /^[a-f\d]{24}$/i.test(value), {
  message: 'Invalid ObjectId format',
});

const ConversationI = z.object({
  conversation: z.object({
    _id: objectId,
    participants: z.array(ContactModel),
    type: z
      .union([z.literal('private'), z.literal('group')])
      .default('private'),
    conversationName: z.string().optional(),
    conversationCover: z.string().optional(),
    messages: z.array(objectId).default([]),
    admin: objectId.optional(),
    cardData: z.object({
      lastMessageSender: objectId.optional(),
      lastMessageContent: z.string().default(''),
      lastMessageDate: z.date().optional(),
    }),
  }),
  muted: z.boolean(),
  unread: z.number(),
});

export type ConversationInterface = z.infer<typeof ConversationI>;
