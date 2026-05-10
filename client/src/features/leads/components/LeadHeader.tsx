import { memo } from 'react';
import { StatusDropdown } from './StatusDropdown';
import type { ILeadHeaderProps } from './types';

const LeadHeaderBase = ({ lead }: ILeadHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="truncate text-heading text-lg font-semibold">{lead.name}</h2>
        <div className="flex flex-wrap gap-x-3 text-sm text-labels">
          {lead.company ? <span>{lead.company}</span> : null}
          {lead.phone ? <span>{lead.phone}</span> : null}
        </div>
      </div>
      <StatusDropdown leadId={lead.id} status={lead.status} />
    </div>
  );
};
LeadHeaderBase.displayName = 'LeadHeader';

export const LeadHeader = memo(LeadHeaderBase);
