import { memo } from 'react';
import { LeadCard } from './LeadCard';
import type { ITodaysFollowUpsProps } from './types';

const TodaysFollowUpsBase = ({ leads, onOpenTimeline }: ITodaysFollowUpsProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-labels">
        <span className="mr-1.5">📌</span>TODAY&apos;S FOLLOW-UPS
      </h2>
      {leads.length === 0 ? (
        <p className="text-labels">Nothing due today.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onOpenTimeline={onOpenTimeline} />
          ))}
        </div>
      )}
    </section>
  );
};
TodaysFollowUpsBase.displayName = 'TodaysFollowUps';

export const TodaysFollowUps = memo(TodaysFollowUpsBase);
