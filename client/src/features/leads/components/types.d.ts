import type { Lead, LeadStatus } from '@prisma/client';

export interface ILeadCardProps {
  lead: Lead;
  onOpenTimeline: (leadId: string) => void;
}

export interface ILeadListProps {
  leads: Lead[];
  onOpenTimeline: (leadId: string) => void;
}

export interface ITodaysFollowUpsProps {
  leads: Lead[];
  onOpenTimeline: (leadId: string) => void;
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

export interface IFilterBarProps {
  q: string;
  status: LeadStatus | null;
  onQChange: (q: string) => void;
  onStatusChange: (status: LeadStatus | null) => void;
}

export interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface IStatusFilterPillsProps {
  value: LeadStatus | null;
  onChange: (value: LeadStatus | null) => void;
}

export interface ILeadsRouteProps {
  onAddLead: () => void;
  onOpenTimeline: (leadId: string) => void;
}
