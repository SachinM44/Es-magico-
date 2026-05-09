import { LeadStatus } from '@prisma/client';
import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  status: z.nativeEnum(LeadStatus).optional(),
  followUpAt: z.string().datetime().optional(),
});

export const updateLeadSchema = z
  .object({
    name: z.string().min(1).max(200).optional(),
    company: z.string().max(200).nullish(),
    phone: z.string().max(50).nullish(),
    status: z.nativeEnum(LeadStatus).optional(),
    followUpAt: z.string().datetime().nullish(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'At least one field required' });

export const listLeadsQuerySchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  q: z.string().max(200).optional(),
  followUp: z.enum(['today', 'overdue']).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type ListLeadsQuery = z.infer<typeof listLeadsQuerySchema>;
