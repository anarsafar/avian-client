import * as z from 'zod';

const objectId = z.string().refine((value) => /^[a-f\d]{24}$/i.test(value), {
  message: 'Invalid ObjectId format',
});

const Notification = z.object({
  userId: objectId,
  type: z.union([z.literal('reset'), z.literal('login'), z.literal('group')]),
  osInfo: z.string().min(1, 'OS info required'),
  location: z
    .object({
      latitude: z.number().min(1, 'latitude is required'),
      longitude: z.number().min(1, 'ongitude is required'),
    })
    .optional(),
  browserInfo: z.string(),
  timestamp: z.date().default(new Date()),
});

export type NotificationI = z.infer<typeof Notification>;
