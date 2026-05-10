import { memo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { discussionsApi } from '@/api/discussions';
import { Input } from '@/components/ui/input';
import type { IAddDiscussionFormProps } from './types';

const MAX_NOTE = 2000;

const AddDiscussionFormBase = ({ leadId }: IAddDiscussionFormProps) => {
  const qc = useQueryClient();
  const [note, setNote] = useState('');
  const [setFollowUp, setSetFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('');
  const [error, setError] = useState<string | null>(null);

  const composedFollowUp =
    setFollowUp && followUpDate && followUpTime
      ? new Date(`${followUpDate}T${followUpTime}`).toISOString()
      : undefined;

  const mutation = useMutation({
    mutationFn: () =>
      discussionsApi.create(leadId, {
        note: note.trim(),
        followUpAt: composedFollowUp,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['lead', leadId] });
      setNote('');
      setSetFollowUp(false);
      setFollowUpDate('');
      setFollowUpTime('');
      setError(null);
    },
    onError: (e: Error) => setError(e.message || 'Failed to add note'),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = note.trim();
    if (!trimmed) {
      setError('Note is required');
      return;
    }
    if (trimmed.length > MAX_NOTE) {
      setError(`Note too long (max ${MAX_NOTE})`);
      return;
    }
    setError(null);
    mutation.mutate();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 border-t border-default pt-4">
      <textarea
        value={note}
        maxLength={MAX_NOTE}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Log a new discussion..."
        className="rounded-md border border-default bg-white px-3 py-2 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      <label className="flex items-center gap-2 text-sm text-labels">
        <input
          type="checkbox"
          checked={setFollowUp}
          onChange={(e) => setSetFollowUp(e.target.checked)}
        />
        Set Follow-up
      </label>
      {setFollowUp ? (
        <div className="flex gap-2">
          <Input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
          <Input
            type="time"
            value={followUpTime}
            onChange={(e) => setFollowUpTime(e.target.value)}
          />
        </div>
      ) : null}
      {error ? <p className="text-xs text-red-dark">{error}</p> : null}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-md bg-neutral-darker px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Save Note
        </button>
      </div>
    </form>
  );
};
AddDiscussionFormBase.displayName = 'AddDiscussionForm';

export const AddDiscussionForm = memo(AddDiscussionFormBase);
