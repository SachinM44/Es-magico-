import { memo } from 'react';
import { SearchInput } from './SearchInput';
import { StatusFilterPills } from './StatusFilterPills';
import type { IFilterBarProps } from '../types';

const FilterBarBase = ({ q, status, onQChange, onStatusChange }: IFilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <StatusFilterPills value={status} onChange={onStatusChange} />
      <SearchInput value={q} onChange={onQChange} />
    </div>
  );
};
FilterBarBase.displayName = 'FilterBar';

export const FilterBar = memo(FilterBarBase);
