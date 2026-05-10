import { memo } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import { fromNow, isOverdue, isToday } from '../utils/time';
import type { ILeadCardProps } from './types';

const LeadCardBase = ({ lead, onOpenTimeline }: ILeadCardProps) => {
  const overdue = isOverdue(lead.followUpAt, lead.status);
  const today = !overdue && isToday(lead.followUpAt);

  const surface = overdue
    ? 'bg-red-lighter border-red'
    : today
      ? 'bg-blue-lighter border-blue-light'
      : 'bg-white border-default';

  const bellTone = overdue
    ? 'text-red-dark font-semibold'
    : today
      ? 'text-blue-dark font-medium'
      : 'text-labels';

  const noteHolder = lead as unknown as { lastNote?: string | null };
  const lastNote = noteHolder.lastNote ?? null;

  return (
    <button
      type="button"
      onClick={() => onOpenTimeline(lead.id)}
      className={cn(
        'block w-full rounded-lg border p-4 text-left transition hover:opacity-95',
        surface,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-heading">{lead.name}</h3>
          {lead.company ? <p className="truncate text-labels">{lead.company}</p> : null}
        </div>
        <StatusBadge status={lead.status} />
      </div>

      {lastNote ? (
        <div className="mt-3">
          <p className="text-labels">Last Note:</p>
          <p className="text-body">{lastNote}</p>
        </div>
      ) : null}

      {lead.followUpAt ? (
        <div className={cn('mt-3 flex items-center gap-2 text-sm', bellTone)}>
          <Bell className="h-4 w-4" />
          <span>{fromNow(lead.followUpAt)}</span>
        </div>
      ) : null}
    </button>
  );
};
LeadCardBase.displayName = 'LeadCard';

export const LeadCard = memo(LeadCardBase);
