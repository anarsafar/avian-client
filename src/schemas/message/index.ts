import * as z from 'zod';

const objectId = z.string().refine((value) => /^[a-f\d]{24}$/i.test(value), {
  message: 'Invalid ObjectId format',
});

const Message = z.object({
  _id: objectId,
  sender: objectId,
  recipients: z.array(objectId),
  content: z.string(),
  timestamp: z.date().default(new Date()),
  conversation: objectId,
  isRead: z.boolean().default(false),
});

export type MessageI = z.infer<typeof Message>;

export interface MessageResponse {
  messages: MessageI[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
