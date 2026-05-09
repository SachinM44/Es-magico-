import { z } from 'zod';

export const createDiscussionSchema = z.object({
  note: z.string().min(1).max(2000),
  followUpAt: z.string().datetime().optional(),
});

export type CreateDiscussionInput = z.infer<typeof createDiscussionSchema>;
