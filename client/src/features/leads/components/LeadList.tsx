import { memo } from 'react';
import { LeadCard } from './LeadCard';
import type { ILeadListProps } from './types';

const LeadListBase = ({ leads, onOpenTimeline }: ILeadListProps) => {
  if (leads.length === 0) {
    return <p className="text-labels">No leads yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onOpenTimeline={onOpenTimeline} />
      ))}
    </div>
  );
};
LeadListBase.displayName = 'LeadList';

export const LeadList = memo(LeadListBase);
