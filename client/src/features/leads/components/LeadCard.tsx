import { memo } from 'react';
import { Bell } from 'lucide-react';
import { dayjs, userTz } from '@/lib/time';
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
        <h3 className="min-w-0 truncate font-semibold text-heading">
          {lead.name}
          {lead.company ? (
            <span className="ml-1 font-normal text-labels">({lead.company})</span>
          ) : null}
        </h3>
        <StatusBadge status={lead.status} />
      </div>

      {lead.lastNote ? (
        <p className="mt-2 text-sm">
          <span className="font-medium text-body">Last Note:</span>{' '}
          <span className="text-body">{lead.lastNote}</span>{' '}
          <span className="text-labels">{fromNow(lead.updatedAt)}</span>
        </p>
      ) : null}

      {today && lead.followUpAt ? (
        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-blue-dark">
          <Bell className="h-4 w-4" />
          <span>Follow-up today at {dayjs(lead.followUpAt).tz(userTz()).format('h:mm A')}</span>
        </div>
      ) : null}

      {overdue && lead.followUpAt ? (
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-red-dark">
          <Bell className="h-4 w-4" />
          <span>{fromNow(lead.followUpAt)}</span>
        </div>
      ) : null}
    </button>
  );
};
LeadCardBase.displayName = 'LeadCard';

export const LeadCard = memo(LeadCardBase);
