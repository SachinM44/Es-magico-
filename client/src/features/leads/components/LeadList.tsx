import { memo } from 'react';
import { LeadCard } from './LeadCard';
import { useDialogStore } from '../store/dialogStore';
import type { ILeadListProps } from './types';

const LeadListBase = ({ leads }: ILeadListProps) => {
  const openTimeline = useDialogStore((s) => s.openTimeline);

  if (leads.length === 0) {
    return <p className="text-sm text-labels">No leads yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onClick={(l) => openTimeline(l.id)} />
      ))}
    </div>
  );
};
LeadListBase.displayName = 'LeadList';

export const LeadList = memo(LeadListBase);
