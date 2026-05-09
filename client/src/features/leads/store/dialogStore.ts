import { create } from 'zustand';

interface IDialogState {
  addOpen: boolean;
  timelineOpen: boolean;
  selectedLeadId: string | null;
  openAdd: () => void;
  closeAdd: () => void;
  openTimeline: (leadId: string) => void;
  closeTimeline: () => void;
}

export const useDialogStore = create<IDialogState>((set) => ({
  addOpen: false,
  timelineOpen: false,
  selectedLeadId: null,
  openAdd: () => set({ addOpen: true }),
  closeAdd: () => set({ addOpen: false }),
  openTimeline: (leadId) => set({ timelineOpen: true, selectedLeadId: leadId }),
  closeTimeline: () => set({ timelineOpen: false, selectedLeadId: null }),
}));
