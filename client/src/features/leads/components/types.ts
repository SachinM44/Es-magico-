import type { Lead, LeadStatus } from '@prisma/client';

export interface ILeadWithLastNote extends Lead {
  lastNote: string | null;
}

export interface ILeadCardProps {
  lead: ILeadWithLastNote;
  onOpenTimeline: (leadId: string) => void;
}

export interface ILeadListProps {
  leads: ILeadWithLastNote[];
  onOpenTimeline: (leadId: string) => void;
}

export interface ITodaysFollowUpsProps {
  leads: ILeadWithLastNote[];
  onOpenTimeline: (leadId: string) => void;
}

export interface IStatusBadgeProps {
  status: LeadStatus;
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

export interface ILeadHeaderProps {
  lead: Lead;
}

export interface IStatusDropdownProps {
  leadId: string;
  status: LeadStatus;
}

export interface IDiscussionListProps {
  discussions: IDiscussionWithMeta[];
}

export interface IDiscussionWithMeta {
  id: string;
  leadId: string;
  note: string;
  followUpAt: string | null;
  createdAt: string;
}

export interface IAddDiscussionFormProps {
  leadId: string;
}

export interface ILeadWithDiscussions extends Lead {
  discussions: IDiscussionWithMeta[];
}
