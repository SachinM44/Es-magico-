import { memo } from 'react';
import type { LeadStatus } from '@prisma/client';
import { LEAD_STATUSES, STATUS_STYLES } from '@/lib/status';
import { cn } from '@/lib/utils';
import type { IStatusFilterPillsProps } from '../types';

const PILL_BASE = 'rounded-full border px-3 py-1 text-sm transition';
const ACTIVE = 'bg-neutral-darker text-white border-transparent';
const INACTIVE = 'bg-white text-body border-default hover:bg-neutral';

const StatusFilterPillsBase = ({ value, onChange }: IStatusFilterPillsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(PILL_BASE, value === null ? ACTIVE : INACTIVE)}
      >
        All
      </button>
      {LEAD_STATUSES.map((s: LeadStatus) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={cn(PILL_BASE, value === s ? ACTIVE : INACTIVE)}
        >
          {STATUS_STYLES[s].label}
        </button>
      ))}
    </div>
  );
};
StatusFilterPillsBase.displayName = 'StatusFilterPills';

export const StatusFilterPills = memo(StatusFilterPillsBase);
