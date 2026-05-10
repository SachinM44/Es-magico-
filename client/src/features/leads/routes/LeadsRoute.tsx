import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import type { LeadStatus } from '@prisma/client';
import { LEAD_STATUSES } from '@/lib/status';
import { FilterBar } from '../components/filters/FilterBar';
import { LeadList } from '../components/LeadList';
import { TodaysFollowUps } from '../components/TodaysFollowUps';
import { useLeads } from '../store/useLeads';
import { isToday } from '../utils/time';
import type { ILeadsRouteProps } from '../components/types';

const parseStatus = (raw: string | null): LeadStatus | null => {
  if (!raw) return null;
  return (LEAD_STATUSES as readonly string[]).includes(raw) ? (raw as LeadStatus) : null;
};

const LeadsRouteBase = ({ onAddLead, onOpenTimeline }: ILeadsRouteProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const status = parseStatus(searchParams.get('status'));

  const setQ = useCallback(
    (next: string) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next) p.set('q', next);
          else p.delete('q');
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setStatus = useCallback(
    (next: LeadStatus | null) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next) p.set('status', next);
          else p.delete('status');
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const { data: leads = [] } = useLeads({ status: status ?? undefined, q });
  const todays = leads.filter((l) => isToday(l.followUpAt));
  const others = leads.filter((l) => !isToday(l.followUpAt));

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-2xl font-bold">LeadFlow</span>
        </div>
        <button
          type="button"
          onClick={onAddLead}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary-dark"
        >
          + Add New Lead
        </button>
      </header>

      <FilterBar q={q} status={status} onQChange={setQ} onStatusChange={setStatus} />

      <TodaysFollowUps leads={todays} onOpenTimeline={onOpenTimeline} />

      <hr className="border-default" />

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-labels">ALL LEADS</h2>
        <LeadList leads={others} onOpenTimeline={onOpenTimeline} />
      </section>
    </div>
  );
};
LeadsRouteBase.displayName = 'LeadsRoute';

export const LeadsRoute = memo(LeadsRouteBase);
