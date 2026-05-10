import type { Lead, LeadStatus } from '@prisma/client';
import { request } from './client';

export interface ILeadListParams {
  status?: LeadStatus;
  q?: string;
  followUp?: 'today' | 'overdue';
}

export const leadsApi = {
  list: (params: ILeadListParams = {}): Promise<Lead[]> => {
    const qs = new URLSearchParams();
    if (params.status) qs.set('status', params.status);
    if (params.q) qs.set('q', params.q);
    if (params.followUp) qs.set('followUp', params.followUp);
    const suffix = qs.toString() ? `?${qs.toString()}` : '';
    return request<Lead[]>(`/leads${suffix}`);
  },
  get: (id: string): Promise<Lead> => request<Lead>(`/leads/${id}`),
  create: (
    body: Pick<Lead, 'name'> & Partial<Pick<Lead, 'company' | 'phone' | 'status'>>,
  ): Promise<Lead> => request<Lead>(`/leads`, { method: 'POST', body: JSON.stringify(body) }),
  patch: (
    id: string,
    body: Partial<Pick<Lead, 'name' | 'company' | 'phone' | 'status'>>,
  ): Promise<Lead> =>
    request<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
};
