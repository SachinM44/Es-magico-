import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LeadStatus } from '@prisma/client';
import { createLeadSchema, type CreateLeadInput } from '@server/schemas/lead';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { leadsApi } from '@/api/leads';
import { LEAD_STATUSES, STATUS_STYLES } from '@/lib/status';
import { useDialogStore } from '@/store/dialogs';
import type { IAddLeadDialogProps } from './types';

const DEFAULTS: CreateLeadInput = { name: '', company: '', phone: '', status: 'NEW' };

const AddLeadDialogBase = ({ open, onOpenChange }: IAddLeadDialogProps) => {
  const close = useDialogStore((s) => s.close);
  const qc = useQueryClient();
  const form = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: DEFAULTS,
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = form;

  useEffect(() => {
    if (!open) reset(DEFAULTS);
  }, [open, reset]);

  const mutation = useMutation({
    mutationFn: (body: CreateLeadInput) =>
      leadsApi.create({
        name: body.name,
        company: body.company || undefined,
        phone: body.phone || undefined,
        status: (body.status as LeadStatus | undefined) ?? 'NEW',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
      reset(DEFAULTS);
      onOpenChange?.(false);
      close();
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));
  const status = watch('status') ?? 'NEW';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(e) => {
          if (isDirty) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-labels">
              Name<span className="ml-0.5 text-red">*</span>
            </label>
            <Input {...register('name')} aria-invalid={!!errors.name} />
            {errors.name ? (
              <p className="text-xs text-red-dark">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-labels">Company</label>
            <Input {...register('company')} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-labels">Phone</label>
            <Input {...register('phone')} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-labels">Status</label>
            <select
              value={status}
              onChange={(e) => setValue('status', e.target.value as LeadStatus, { shouldDirty: true })}
              className="h-9 rounded-md border border-default bg-white px-3 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_STYLES[s].label}
                </option>
              ))}
            </select>
          </div>
          {mutation.isError ? (
            <p className="text-xs text-red-dark">
              {(mutation.error as Error).message || 'Failed to create lead'}
            </p>
          ) : null}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset(DEFAULTS);
                onOpenChange?.(false);
                close();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || mutation.isPending}>
              Save Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
AddLeadDialogBase.displayName = 'AddLeadDialog';

export const AddLeadDialog = memo(AddLeadDialogBase);
