import { create } from 'zustand';

type DialogKind = 'add' | 'timeline' | null;

interface IDialogsState {
  openDialog: DialogKind;
  selectedLeadId: string | null;
  openAdd: () => void;
  openTimeline: (id: string) => void;
  close: () => void;
}

export const useDialogStore = create<IDialogsState>((set) => ({
  openDialog: null,
  selectedLeadId: null,
  openAdd: () => set({ openDialog: 'add', selectedLeadId: null }),
  openTimeline: (id) => set({ openDialog: 'timeline', selectedLeadId: id }),
  close: () => set({ openDialog: null, selectedLeadId: null }),
}));
