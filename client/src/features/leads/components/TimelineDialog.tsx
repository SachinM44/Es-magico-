import { memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ITimelineDialogProps } from './types';

const TimelineDialogBase = ({ open, leadId, onOpenChange }: ITimelineDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lead Timeline</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-labels">
          Discussion timeline for {leadId ?? '—'} will live here.
        </p>
      </DialogContent>
    </Dialog>
  );
};
TimelineDialogBase.displayName = 'TimelineDialog';

export const TimelineDialog = memo(TimelineDialogBase);
