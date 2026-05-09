import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type IBadgeProps = HTMLAttributes<HTMLSpanElement>;

export const Badge = ({ className, ...props }: IBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-default bg-white px-2.5 py-0.5 text-xs font-medium text-body',
        className,
      )}
      {...props}
    />
  );
};
Badge.displayName = 'Badge';
