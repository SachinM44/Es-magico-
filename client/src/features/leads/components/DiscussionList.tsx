import { memo } from 'react';
import { dayjs, fromNow } from '@/lib/time';
import { cn } from '@/lib/utils';
import type { IDiscussionListProps } from './types';

const DiscussionListBase = ({ discussions }: IDiscussionListProps) => {
  if (discussions.length === 0) {
    return <p className="text-sm text-labels">No discussions yet.</p>;
  }
  return (
    <ol className="flex flex-col">
      {discussions.map((d, i) => (
        <li key={d.id} className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span
              className={cn(
                'z-10 h-2.5 w-2.5 shrink-0 rounded-full',
                i === 0 ? 'bg-primary' : 'bg-neutral-dark',
              )}
            />
            {i < discussions.length - 1 ? (
              <span className="w-0.5 flex-1 bg-slate-200" />
            ) : null}
          </div>
          <div className="flex-1 pb-6">
            <p className="text-xs text-labels">
              {dayjs(d.createdAt).format('MMM D, h:mm A')} ({fromNow(d.createdAt)})
            </p>
            <div className="mt-1 rounded-md border border-default bg-white p-3">
              <p className="whitespace-pre-wrap text-body">{d.note}</p>
            </div>
            {d.followUpAt ? (
              <span className="mt-2 inline-block rounded-full bg-blue-lighter px-3 py-1 text-xs font-medium text-blue-dark">
                {'📅'} Follow-up set for: {dayjs(d.followUpAt).format('MMM D, YYYY h:mm A')}
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
