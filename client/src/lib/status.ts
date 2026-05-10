import type { LeadStatus } from '@prisma/client';

interface IStatusStyle {
  label: string;
  bg: string;
  text: string;
  border: string;
}

export const STATUS_STYLES: Record<LeadStatus, IStatusStyle> = {
  NEW: {
    label: 'New',
    bg: 'bg-green-lighter',
    text: 'text-green-dark',
    border: 'border-green-light',
  },
  CONTACTED: {
    label: 'Contacted',
    bg: 'bg-yellow-lighter',
    text: 'text-yellow-darker',
    border: 'border-yellow',
  },
  QUALIFIED: {
    label: 'Qualified',
    bg: 'bg-cyan-lighter',
    text: 'text-cyan-dark',
    border: 'border-cyan',
  },
  PROPOSAL_SENT: {
    label: 'Proposal Sent',
    bg: 'bg-purple-lighter',
    text: 'text-purple',
    border: 'border-purple-light',
  },
  WON: { label: 'Won', bg: 'bg-green', text: 'text-white', border: 'border-green-dark' },
  LOST: { label: 'Lost', bg: 'bg-red-lighter', text: 'text-red-dark', border: 'border-red-light' },
};

export const LEAD_STATUSES: readonly LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL_SENT',
  'WON',
  'LOST',
];
