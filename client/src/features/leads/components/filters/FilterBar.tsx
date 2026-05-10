import { memo } from 'react';
import { SearchInput } from './SearchInput';
import { StatusFilterPills } from './StatusFilterPills';
import type { IFilterBarProps } from '../types';

const FilterBarBase = ({ q, status, onQChange, onStatusChange }: IFilterBarProps) => {
  return (
    <div className="flex flex-col gap-3">
      <SearchInput value={q} onChange={onQChange} />
      <StatusFilterPills value={status} onChange={onStatusChange} />
    </div>
  );
};
FilterBarBase.displayName = 'FilterBar';

export const FilterBar = memo(FilterBarBase);
