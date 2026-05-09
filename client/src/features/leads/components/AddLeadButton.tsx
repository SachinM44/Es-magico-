import { memo } from 'react';
import { Plus } from 'lucide-react';
import { useDialogStore } from '../store/dialogStore';

const AddLeadButtonBase = () => {
  const openAdd = useDialogStore((s) => s.openAdd);
  return (
    <button
      type="button"
      onClick={openAdd}
      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
    >
      <Plus className="h-4 w-4" />
      Add Lead
    </button>
  );
};
AddLeadButtonBase.displayName = 'AddLeadButton';

export const AddLeadButton = memo(AddLeadButtonBase);
