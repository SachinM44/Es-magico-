import { memo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import type { LeadStatus } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { leadsApi } from '@/api/leads';
import { LEAD_STATUSES, STATUS_STYLES } from '@/lib/status';
import { cn } from '@/lib/utils';
import type { IStatusDropdownProps } from './types';

const StatusDropdownBase = ({ leadId, status }: IStatusDropdownProps) => {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (next: LeadStatus) => leadsApi.patch(leadId, { status: next }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['lead', leadId] });
    },
  });
  const style = STATUS_STYLES[status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium',
          style.bg,
          style.text,
          style.border,
        )}
      >
        {style.label}
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LEAD_STATUSES.map((s) => (
          <DropdownMenuItem
            key={s}
            onSelect={() => {
              if (s !== status) mutation.mutate(s);
            }}
          >
            {STATUS_STYLES[s].label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
StatusDropdownBase.displayName = 'StatusDropdown';

export const StatusDropdown = memo(StatusDropdownBase);
