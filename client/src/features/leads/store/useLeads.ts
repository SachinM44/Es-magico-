import { useQuery } from '@tanstack/react-query';
import type { Lead, LeadStatus } from '@prisma/client';
import { leadsApi } from '@/api/leads';

export interface IUseLeadsArgs {
  status?: LeadStatus;
  q?: string;
}

export const useLeads = ({ status, q }: IUseLeadsArgs) => {
  return useQuery<Lead[]>({
    queryKey: ['leads', { status: status ?? null, q: q ?? '' }],
    queryFn: () => leadsApi.list({ status, q: q || undefined }),
  });
};
