import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { leadsApi } from '@/api/leads';
import { LeadHeader } from './LeadHeader';
import { DiscussionList } from './DiscussionList';
import { AddDiscussionForm } from './AddDiscussionForm';
import type { ILeadWithDiscussions, ITimelineDialogProps } from './types';

const TimelineDialogBase = ({ open, leadId, onOpenChange }: ITimelineDialogProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => leadsApi.get(leadId as string) as unknown as Promise<ILeadWithDiscussions>,
    enabled: !!leadId && open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {isLoading || !data ? (
          <>
            <DialogHeader>
              <DialogTitle className="sr-only">Lead Timeline</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-labels">Loading…</p>
          </>
        ) : (
          <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
            <DialogHeader>
              <DialogTitle asChild>
                <div>
                  <LeadHeader lead={data} />
                </div>
              </DialogTitle>
            </DialogHeader>
            <DiscussionList discussions={data.discussions ?? []} />
            <AddDiscussionForm leadId={data.id} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
TimelineDialogBase.displayName = 'TimelineDialog';

export const TimelineDialog = memo(TimelineDialogBase);
