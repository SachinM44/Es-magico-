import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leadsApi } from '@/api/leads';
import { isToday } from '@/lib/time';
import { AddLeadButton } from '../components/AddLeadButton';
import { AddLeadDialog } from '../components/AddLeadDialog';
import { LeadList } from '../components/LeadList';
import { TimelineDialog } from '../components/TimelineDialog';
import { TodaysFollowUps } from '../components/TodaysFollowUps';
import { useDialogStore } from '../store/dialogStore';

const LeadsPageBase = () => {
  const { data: leads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsApi.list(),
    retry: false,
  });

  const addOpen = useDialogStore((s) => s.addOpen);
  const closeAdd = useDialogStore((s) => s.closeAdd);
  const timelineOpen = useDialogStore((s) => s.timelineOpen);
  const selectedLeadId = useDialogStore((s) => s.selectedLeadId);
  const closeTimeline = useDialogStore((s) => s.closeTimeline);

  const todays = leads.filter((l) => isToday(l.followUpAt));
  const others = leads.filter((l) => !isToday(l.followUpAt));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-heading">LeadFlow</h1>
        <AddLeadButton />
      </header>

      <TodaysFollowUps leads={todays} />

      <hr className="border-default" />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-labels">All Leads</h2>
        <LeadList leads={others} />
      </section>

      <AddLeadDialog open={addOpen} onOpenChange={(o) => (o ? null : closeAdd())} />
      <TimelineDialog
        open={timelineOpen}
        leadId={selectedLeadId}
        onOpenChange={(o) => (o ? null : closeTimeline())}
      />
    </div>
  );
};
LeadsPageBase.displayName = 'LeadsPage';

export const LeadsPage = memo(LeadsPageBase);
