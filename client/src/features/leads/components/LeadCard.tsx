import { memo } from 'react';
import { StatusBadge } from './StatusBadge';
import type { ILeadCardProps } from './types';

const LeadCardBase = ({ lead, onClick }: ILeadCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick?.(lead)}
      className="block w-full rounded-lg border border-default bg-white p-4 text-left transition hover:bg-neutral"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-heading">{lead.name}</h3>
          {lead.company ? <p className="truncate text-sm text-labels">{lead.company}</p> : null}
        </div>
        <StatusBadge status={lead.status} />
      </div>
    </button>
  );
};
LeadCardBase.displayName = 'LeadCard';

export const LeadCard = memo(LeadCardBase);
