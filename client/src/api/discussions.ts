import type { Discussion } from '@prisma/client';
import { request } from './client';

export interface ICreateDiscussionBody {
  note: string;
  followUpAt?: string | null;
}

export const discussionsApi = {
  create: (leadId: string, body: ICreateDiscussionBody): Promise<Discussion> =>
    request<Discussion>(`/leads/${leadId}/discussions`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
