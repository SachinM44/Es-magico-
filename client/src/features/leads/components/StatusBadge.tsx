import { memo } from 'react';
import { STATUS_STYLES } from '@/lib/status';
import { cn } from '@/lib/utils';
import type { IStatusBadgeProps } from './types';

const StatusBadgeBase = ({ status }: IStatusBadgeProps) => {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        style.bg,
        style.text,
        style.border,
      )}
    >
      {style.label}
    </span>
  );
};
StatusBadgeBase.displayName = 'StatusBadge';

export const StatusBadge = memo(StatusBadgeBase);
