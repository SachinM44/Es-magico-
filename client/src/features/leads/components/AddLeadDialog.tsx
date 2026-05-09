import { memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { IAddLeadDialogProps } from './types';

const AddLeadDialogBase = ({ open, onOpenChange }: IAddLeadDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-labels">Form will live here.</p>
      </DialogContent>
    </Dialog>
  );
};
AddLeadDialogBase.displayName = 'AddLeadDialog';

export const AddLeadDialog = memo(AddLeadDialogBase);
