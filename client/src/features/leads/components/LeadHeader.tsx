import { memo } from 'react';
import { Phone } from 'lucide-react';
import { StatusDropdown } from './StatusDropdown';
import type { ILeadHeaderProps } from './types';

const LeadHeaderBase = ({ lead }: ILeadHeaderProps) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="truncate text-xl font-semibold text-heading">
          {lead.name}
          {lead.company ? (
            <span className="ml-1 font-normal text-labels">({lead.company})</span>
          ) : null}
        </h2>
        {lead.phone ? (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-labels">
            <Phone className="h-3.5 w-3.5" />
            {lead.phone}
          </p>
        ) : null}
      </div>
      <StatusDropdown leadId={lead.id} status={lead.status} />
    </div>
  );
};
LeadHeaderBase.displayName = 'LeadHeader';

export const LeadHeader = memo(LeadHeaderBase);
