import { memo } from 'react';
import { dayjs, fromNow } from '@/lib/time';
import { cn } from '@/lib/utils';
import type { IDiscussionListProps } from './types';

const DiscussionListBase = ({ discussions }: IDiscussionListProps) => {
  if (discussions.length === 0) {
    return <p className="text-sm text-labels">No discussions yet.</p>;
  }
  return (
    <ol className="flex flex-col gap-4">
      {discussions.map((d, i) => (
        <li key={d.id} className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full',
                i === 0 ? 'bg-primary' : 'bg-neutral-dark',
              )}
            />
            {i < discussions.length - 1 ? (
              <span className="mt-1 w-px flex-1 bg-default" />
            ) : null}
          </div>
          <div className="flex-1 pb-2">
            <p className="text-xs text-labels">{fromNow(d.createdAt)}</p>
            <p className="mt-1 whitespace-pre-wrap text-body">{d.note}</p>
            {d.followUpAt ? (
              <span className="mt-2 inline-block rounded-full bg-blue-lighter px-3 py-1 text-xs font-medium text-blue-dark">
                Follow-up set for: {dayjs(d.followUpAt).format('MMM D, YYYY h:mm A')}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
};
DiscussionListBase.displayName = 'DiscussionList';

export const DiscussionList = memo(DiscussionListBase);
