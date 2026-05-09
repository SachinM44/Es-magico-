import { memo } from 'react';
import { LeadCard } from './LeadCard';
import { useDialogStore } from '../store/dialogStore';
import type { ITodaysFollowUpsProps } from './types';

const TodaysFollowUpsBase = ({ leads }: ITodaysFollowUpsProps) => {
  const openTimeline = useDialogStore((s) => s.openTimeline);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-labels">
        Today&apos;s Follow-ups
      </h2>
      {leads.length === 0 ? (
        <p className="text-sm text-labels">Nothing due today.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-lg border border-blue-light bg-blue-lighter p-1">
              <LeadCard lead={lead} onClick={(l) => openTimeline(l.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
TodaysFollowUpsBase.displayName = 'TodaysFollowUps';

export const TodaysFollowUps = memo(TodaysFollowUpsBase);
