import { memo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { discussionsApi } from '@/api/discussions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { IAddDiscussionFormProps } from './types';

const MAX_NOTE = 2000;

const AddDiscussionFormBase = ({ leadId }: IAddDiscussionFormProps) => {
  const qc = useQueryClient();
  const [note, setNote] = useState('');
  const [followUpAt, setFollowUpAt] = useState('');
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () =>
      discussionsApi.create(leadId, {
        note: note.trim(),
        followUpAt: followUpAt ? new Date(followUpAt).toISOString() : undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      qc.invalidateQueries({ queryKey: ['lead', leadId] });
      setNote('');
      setFollowUpAt('');
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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-labels">
          Note<span className="ml-0.5 text-red">*</span>
        </label>
        <textarea
          value={note}
          maxLength={MAX_NOTE}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="rounded-md border border-default bg-white px-3 py-2 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-labels">Follow-up (optional)</label>
        <Input
          type="datetime-local"
          value={followUpAt}
          onChange={(e) => setFollowUpAt(e.target.value)}
        />
      </div>
      {error ? <p className="text-xs text-red-dark">{error}</p> : null}
      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending}>
          Save Note
        </Button>
      </div>
    </form>
  );
};
AddDiscussionFormBase.displayName = 'AddDiscussionForm';

export const AddDiscussionForm = memo(AddDiscussionFormBase);
