import type { Lead, LeadStatus } from '@prisma/client';

export interface ILeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
}

export interface ILeadListProps {
  leads: Lead[];
}

export interface ITodaysFollowUpsProps {
  leads: Lead[];
}

export interface IStatusBadgeProps {
  status: LeadStatus;
}

export interface IAddLeadButtonProps {
  onClick?: () => void;
}

export interface IAddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ITimelineDialogProps {
  open: boolean;
  leadId: string | null;
  onOpenChange: (open: boolean) => void;
}
