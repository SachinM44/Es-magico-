import { useQuery } from '@tanstack/react-query';
import type { LeadStatus } from '@prisma/client';
import { leadsApi } from '@/api/leads';
import type { ILeadWithLastNote } from '@/features/leads/components/types';

export interface IUseLeadsArgs {
  status?: LeadStatus;
  q?: string;
}

export const useLeads = ({ status, q }: IUseLeadsArgs) => {
  return useQuery<ILeadWithLastNote[]>({
    queryKey: ['leads', { status: status ?? null, q: q ?? '' }],
    queryFn: () => leadsApi.list({ status, q: q || undefined }),
  });
};
